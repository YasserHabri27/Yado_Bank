import { ShieldCheck, Globe, CreditCard, PieChart, Smartphone, Users } from 'lucide-react';
import { useLangue } from '../contexte/ContexteLangue';
import RevealOnScroll from '../composants/RevealOnScroll';

const Services = () => {
    const { t } = useLangue();
    return (
        <div className="py-12">
            <RevealOnScroll className="text-center mb-16">
                <span className="text-brand-gold font-bold tracking-wider text-xs uppercase mb-2 block">{t('services.subtitle')}</span>
                <h2 className="text-4xl font-bold text-brand-900 dark:text-white mb-4">{t('services.title')}</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    {t('services.intro')}
                </p>
                <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full mt-6"></div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-8 mb-20 px-6 max-w-7xl mx-auto">
                {[
                    {
                        icon: <ShieldCheck className="w-8 h-8" />,
                        title: t('services.cards.secure.title'),
                        desc: t('services.cards.secure.desc'),
                        color: "blue"
                    },
                    {
                        icon: <Globe className="w-8 h-8" />,
                        title: t('services.cards.intl.title'),
                        desc: t('services.cards.intl.desc'),
                        color: "amber"
                    },
                    {
                        icon: <CreditCard className="w-8 h-8" />,
                        title: t('services.cards.cards.title'),
                        desc: t('services.cards.cards.desc'),
                        color: "emerald"
                    },
                    {
                        icon: <PieChart className="w-8 h-8" />,
                        title: t('services.cards.wealth.title'),
                        desc: t('services.cards.wealth.desc'),
                        color: "purple"
                    },
                    {
                        icon: <Smartphone className="w-8 h-8" />,
                        title: t('services.cards.mobile.title'),
                        desc: t('services.cards.mobile.desc'),
                        color: "rose"
                    },
                    {
                        icon: <Users className="w-8 h-8" />,
                        title: t('services.cards.support.title'),
                        desc: t('services.cards.support.desc'),
                        color: "cyan"
                    }
                ].map((service, idx) => (
                    <RevealOnScroll key={idx} delay={idx * 100} className="bg-white dark:bg-brand-900/50 p-8 rounded-3xl border border-slate-100 dark:border-white/10 shadow-lg hover:shadow-xl transition-all group hover:-translate-y-1">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-${service.color}-100 dark:bg-${service.color}-500/20 text-${service.color}-600 dark:text-${service.color}-400 group-hover:scale-110 transition-transform`}>
                            {service.icon}
                        </div>
                        <h3 className="text-xl font-bold text-brand-900 dark:text-white mb-3">{service.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            {service.desc}
                        </p>
                    </RevealOnScroll>
                ))}
            </div>
        </div>
    );
};

export default Services;
