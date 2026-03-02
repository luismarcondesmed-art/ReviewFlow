import { UserConfig } from '../types';
import { getTodayStr } from '../utils';

export class NotificationService {
    private static instance: NotificationService;
    private checkInterval: NodeJS.Timeout | null = null;
    private lastNotificationDate: string | null = null;

    private constructor() {
        this.lastNotificationDate = localStorage.getItem('lastNotificationDate');
    }

    public static getInstance(): NotificationService {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }
        return NotificationService.instance;
    }

    public async requestPermission(): Promise<boolean> {
        if (!('Notification' in window)) {
            console.warn('This browser does not support desktop notification');
            return false;
        }

        if (Notification.permission === 'granted') {
            return true;
        }

        if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        }

        return false;
    }

    public startService(config: UserConfig) {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
        }

        if (!config.notifications?.enabled) {
            return;
        }

        // Check every minute
        this.checkInterval = setInterval(() => {
            this.checkAndNotify(config);
        }, 60000);
        
        // Initial check
        this.checkAndNotify(config);
    }

    public stopService() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
    }

    private checkAndNotify(config: UserConfig) {
        if (!config.notifications?.enabled) return;

        const today = getTodayStr();
        if (this.lastNotificationDate === today) return; // Already notified today

        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        // Check if current time matches or is slightly past the scheduled time (within 5 mins)
        // This handles cases where the user opens the app slightly after the scheduled time
        const scheduledTime = config.notifications.time;
        
        if (this.isTimeToNotify(currentTime, scheduledTime)) {
            this.showNotification(config);
            this.lastNotificationDate = today;
            localStorage.setItem('lastNotificationDate', today);
        }
    }

    private isTimeToNotify(current: string, scheduled: string): boolean {
        const [currH, currM] = current.split(':').map(Number);
        const [schH, schM] = scheduled.split(':').map(Number);
        
        const currMinutes = currH * 60 + currM;
        const schMinutes = schH * 60 + schM;
        
        // Notify if current time is equal or past scheduled time
        // This ensures that if the user opens the app at 10:00 but scheduled for 08:00,
        // they still get the notification for today.
        return currMinutes >= schMinutes;
    }

    private async showNotification(config: UserConfig) {
        if (Notification.permission === 'granted') {
            const options: NotificationOptions = {
                body: this.getNotificationBody(config),
                icon: '/icon-192.png',
                badge: '/icon-192.png',
                tag: 'daily-review-reminder',
                requireInteraction: true
            };

            // Try to use Service Worker registration for "persistent" notification
            if ('serviceWorker' in navigator) {
                const registration = await navigator.serviceWorker.ready;
                if (registration) {
                    registration.showNotification('Hora de Revisar! 📚', options);
                    return;
                }
            }

            // Fallback to standard Notification API
            new Notification('Hora de Revisar! 📚', options);
        }
    }

    private getNotificationBody(config: UserConfig): string {
        const parts = [];
        
        if (config.notifications?.showQuestionCount) {
            parts.push('Você tem revisões pendentes para hoje.');
        } else {
            parts.push('Mantenha sua ofensiva em dia!');
        }

        if (config.notifications?.showModules) {
            parts.push('Foque nos temas prioritários.');
        }

        return parts.join(' ');
    }
}
