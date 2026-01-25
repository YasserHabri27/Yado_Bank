import { Award, Target, Users2, Building } from 'lucide-react';
import { useLangue } from '../contexte/ContexteLangue';
import RevealOnScroll from '../composants/RevealOnScroll';
import Earth3D from '../composants/Earth3D';

const APropos = () => {
    const { t } = useLangue();

    return (
        <div className="py-12 max-w-6xl mx-auto px-6">
            <RevealOnScroll className="text-center mb-16">
                <span className="text-brand-gold font-bold tracking-wider text-xs uppercase mb-2 block">{t('about.subtitle')}</span>
                <h2 className="text-4xl font-bold text-brand-900 dark:text-white mb-4">{t('about.title')}</h2>
                <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full mt-6"></div>
            </RevealOnScroll>

            <RevealOnScroll className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <div className="relative">
                    <div className="aspect-square bg-brand-dark rounded-3xl overflow-hidden relative shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-900 to-brand-bp/50"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Building className="w-32 h-32 text-brand-gold opacity-50" />
                        </div>
                    </div>
                    {/* Decorative Element */}
                    <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl"></div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-brand-900 dark:text-white">{t('about.whoTitle')}</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                        {t('about.whoDesc1')}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                        {t('about.whoDesc2')}
                    </p>
                </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-8">
                <RevealOnScroll delay={0} className="bg-white dark:bg-brand-900/50 p-8 rounded-3xl border border-slate-100 dark:border-white/10 shadow-lg hover:shadow-xl transition-all">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-6">
                        <Award className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold text-brand-900 dark:text-white mb-3">{t('about.excellenceTitle')}</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                        {t('about.excellenceDesc')}
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={100} className="bg-white dark:bg-brand-900/50 p-8 rounded-3xl border border-slate-100 dark:border-white/10 shadow-lg hover:shadow-xl transition-all">
                    <div className="w-12 h-12 bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 rounded-xl flex items-center justify-center mb-6">
                        <Target className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold text-brand-900 dark:text-white mb-3">Innovation</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                        {t('about.excellenceDesc')}
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={200} className="bg-white dark:bg-brand-900/50 p-8 rounded-3xl border border-slate-100 dark:border-white/10 shadow-lg hover:shadow-xl transition-all">
                    <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 rounded-xl flex items-center justify-center mb-6">
                        <Users2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold text-brand-900 dark:text-white mb-3">{t('about.proximityTitle')}</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                        {t('about.proximityDesc')}
                    </p>
                </RevealOnScroll>
            </div>

            <div className="mt-20">
                <RevealOnScroll>
                    <Earth3D />
                </RevealOnScroll>
            </div>
        </div>
    );
};

export default APropos;
