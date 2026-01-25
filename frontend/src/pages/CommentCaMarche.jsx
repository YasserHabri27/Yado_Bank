import RevealOnScroll from '../composants/RevealOnScroll';
import { Download, Scan, UserCheck, ArrowRight } from 'lucide-react';

const CommentCaMarche = () => {
    return (
        <section id="comment-ca-marche" className="py-20 bg-white dark:bg-[#001830] transition-colors duration-300">
            <div className="container mx-auto px-6">
                <RevealOnScroll className="text-center mb-16">
                    <span className="text-brand-gold font-bold tracking-widest uppercase text-xs mb-2 block">Simple & Rapide</span>
                    <h2 className="text-4xl font-bold text-brand-900 dark:text-white mb-6">Devenir client en 3 étapes</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        Ouvrez votre compte Yado Bank en quelques minutes, sans vous déplacer.
                    </p>
                    <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full mt-8"></div>
                </RevealOnScroll>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-white/10 -translate-y-1/2 z-0"></div>

                    {/* Step 1 */}
                    <RevealOnScroll delay={0} className="relative z-10 bg-slate-50 dark:bg-[#001F3F] p-8 rounded-3xl border border-slate-200 dark:border-white/10 text-center hover:transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-16 h-16 mx-auto bg-brand-gold rounded-full flex items-center justify-center text-brand-900 font-bold text-2xl mb-6 shadow-lg shadow-brand-gold/20">
                            1
                        </div>
                        <h3 className="text-xl font-bold text-brand-900 dark:text-white mb-3">Téléchargez l'App</h3>
                        <div className="flex justify-center my-4 text-brand-gold">
                            <Download className="w-8 h-8" />
                        </div>
                        <p className="text-slate-600 dark:text-slate-400">
                            Installez l'application Yado Bank sécurisée sur votre smartphone (iOS & Android).
                        </p>
                    </RevealOnScroll>

                    {/* Step 2 */}
                    <RevealOnScroll delay={200} className="relative z-10 bg-slate-50 dark:bg-[#001F3F] p-8 rounded-3xl border border-slate-200 dark:border-white/10 text-center hover:transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-16 h-16 mx-auto bg-brand-gold rounded-full flex items-center justify-center text-brand-900 font-bold text-2xl mb-6 shadow-lg shadow-brand-gold/20">
                            2
                        </div>
                        <h3 className="text-xl font-bold text-brand-900 dark:text-white mb-3">Scannez votre CIN</h3>
                        <div className="flex justify-center my-4 text-brand-gold">
                            <Scan className="w-8 h-8" />
                        </div>
                        <p className="text-slate-600 dark:text-slate-400">
                            Prenez une photo de votre Carte Nationale d'Identité pour vérifier votre identité.
                        </p>
                    </RevealOnScroll>

                    {/* Step 3 */}
                    <RevealOnScroll delay={400} className="relative z-10 bg-slate-50 dark:bg-[#001F3F] p-8 rounded-3xl border border-slate-200 dark:border-white/10 text-center hover:transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-16 h-16 mx-auto bg-brand-gold rounded-full flex items-center justify-center text-brand-900 font-bold text-2xl mb-6 shadow-lg shadow-brand-gold/20">
                            3
                        </div>
                        <h3 className="text-xl font-bold text-brand-900 dark:text-white mb-3">Selfie & Signature</h3>
                        <div className="flex justify-center my-4 text-brand-gold">
                            <UserCheck className="w-8 h-8" />
                        </div>
                        <p className="text-slate-600 dark:text-slate-400">
                            Confirmez avec un selfie vidéo et signez votre contrat électroniquement. C'est tout !
                        </p>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
};

export default CommentCaMarche;
