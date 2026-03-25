import React, { useEffect } from 'react';

interface AdBannerProps {
    userRole: string;
    // Opcional: Você pode passar os IDs via props ou deixar fixo aqui
    adClient?: string;
    adSlot?: string;
}

export const AdBanner = ({ userRole, adClient = "ca-pub-SEU_ID_AQUI", adSlot = "SEU_SLOT_AQUI" }: AdBannerProps) => {
    // Só exibe anúncios para usuários gratuitos
    if (userRole !== 'free') return null;
    
    useEffect(() => {
        try {
            // Inicializa o anúncio do Google AdSense
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('Erro ao carregar o AdSense:', err);
        }
    }, []);

    return (
        <div className="w-full my-4 flex justify-center overflow-hidden min-h-[100px] bg-slate-100 dark:bg-zinc-900/50 rounded-xl items-center">
            {/* Se os IDs ainda não foram configurados, mostra um placeholder */}
            {adClient === "ca-pub-SEU_ID_AQUI" ? (
                <span className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">
                    Espaço para Anúncio (AdSense)
                </span>
            ) : (
                <ins className="adsbygoogle"
                     style={{ display: 'block', width: '100%' }}
                     data-ad-client={adClient}
                     data-ad-slot={adSlot}
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
            )}
        </div>
    );
};
