import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
    userRole: string;
    // Opcional: Você pode passar os IDs via props ou deixar fixo aqui
    adClient?: string;
    adSlot?: string;
}

export const AdBanner = ({ userRole, adClient = "ca-pub-6526249232306742", adSlot = "1876421190" }: AdBannerProps) => {
    const adPushed = useRef(false);

    // Só exibe anúncios para usuários gratuitos
    if (userRole !== 'free') return null;
    
    useEffect(() => {
        if (adPushed.current) return;
        if (adSlot === "SEU_SLOT_AQUI") return;

        try {
            // Inicializa o anúncio do Google AdSense
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            adPushed.current = true;
        } catch (err: any) {
            if (err.message && err.message.includes('already have ads')) {
                adPushed.current = true;
            } else {
                console.error('Erro ao carregar o AdSense:', err);
            }
        }
    }, [adSlot]);

    return (
        <div className="fixed bottom-0 left-0 w-full flex justify-center overflow-hidden min-h-[60px] sm:min-h-[90px] bg-slate-100 dark:bg-zinc-900/95 backdrop-blur-md items-center z-[80] border-t border-slate-200 dark:border-white/10 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
            {/* Se os IDs ainda não foram configurados, mostra um placeholder */}
            {adSlot === "SEU_SLOT_AQUI" ? (
                <span className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest py-4">
                    Espaço para Anúncio (AdSense)
                </span>
            ) : (
                <ins className="adsbygoogle"
                     style={{ display: 'block', width: '100%', height: '90px' }}
                     data-ad-client={adClient}
                     data-ad-slot={adSlot}
                     data-ad-format="horizontal"
                     data-full-width-responsive="true"></ins>
            )}
        </div>
    );
};
