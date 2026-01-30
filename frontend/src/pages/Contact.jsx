import { MapPin, Phone, Mail, Send, Clock, Globe2 } from 'lucide-react';
import { useLangue } from '../contexte/ContexteLangue';
import RevealOnScroll from '../composants/RevealOnScroll';

const Contact = () => {
    const { t } = useLangue();
    return (
        <div className="py-12 max-w-6xl mx-auto px-6">
            <RevealOnScroll className="text-center mb-16">
                <span className="text-brand-gold font-bold tracking-wider text-xs uppercase mb-2 block">{t('contact.subtitle')}</span>
                <h2 className="text-4xl font-bold text-brand-900 dark:text-white mb-4">{t('contact.title')}</h2>
                <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full mt-6"></div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <RevealOnScroll delay={0} className="bg-brand-900 text-white p-10 rounded-3xl relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                    <h3 className="text-2xl font-bold mb-8 relative z-10">{t('contact.coordsTitle')}</h3>

                    <div className="space-y-8 relative z-10">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                <MapPin className="w-6 h-6 text-brand-gold" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-1">Siège Social</h4>
                                <p className="text-slate-300">Quartier Des Banques, Casablanca<br />Maroc</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                <Phone className="w-6 h-6 text-brand-gold" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-1">Téléphone</h4>
                                <p className="text-slate-300">+212 5 22 00 00 00</p>
                                <p className="text-sm text-brand-gold mt-1">Du Lundi au Vendredi, 8h - 18h</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                <Mail className="w-6 h-6 text-brand-gold" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-1">{t('common.email')}</h4>
                                <p className="text-slate-300">contact@yadobank.ma</p>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* Contact Form */}
                <RevealOnScroll delay={200} className="bg-white dark:bg-brand-900/50 p-10 rounded-3xl border border-slate-100 dark:border-white/10 shadow-xl">
                    <h3 className="text-2xl font-bold text-brand-900 dark:text-white mb-8">{t('contact.formTitle')}</h3>
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-brand-900 dark:text-white ml-1">{t('contact.name')}</label>
                                <input type="text" className="w-full input-premium bg-slate-50 dark:bg-white/5" placeholder="Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-brand-900 dark:text-white ml-1">{t('contact.firstname')}</label>
                                <input type="text" className="w-full input-premium bg-slate-50 dark:bg-white/5" placeholder="John" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-brand-900 dark:text-white ml-1">{t('common.email')}</label>
                            <input type="email" className="w-full input-premium bg-slate-50 dark:bg-white/5" placeholder="john@example.com" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-brand-900 dark:text-white ml-1">{t('contact.message')}</label>
                            <textarea rows="4" className="w-full input-premium bg-slate-50 dark:bg-white/5 resize-none" placeholder={t('contact.placeholderMsg')}></textarea>
                        </div>

                        <button className="w-full btn-premium py-4 flex items-center justify-center gap-2">
                            {t('contact.btnSend')}
                            <Send className="w-5 h-5 rtl:rotate-180" />
                        </button>
                    </form>
                </RevealOnScroll>
            </div>
        </div>
    );
};

export default Contact;
