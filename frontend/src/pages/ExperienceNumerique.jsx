import { useState, useEffect } from ;
import { ChevronLeft, ChevronRight, Laptop, Smartphone, ShieldCheck, MonitorCheck, Wifi, Lock } from ;
import RevealOnScroll from ;

const ExperienceNumerique = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: "Votre Banque, Partout Avec Vous",
            subtitle: "EXPÉRIENCE 100% DIGITALE",
            desc: "Gérez vos finances depuis votre smartphone, tablette ou ordinateur avec une interface fluide et intuitive. Virements instantanés, gestion de plafond, et blocage de carte en un clic.",
            image: "/assets/carousel_dashboard.png",
            icons: [
                { icon: <Laptop className="w-6 h-6" />, label: "Web" },
                { icon: <Smartphone className="w-6 h-6" />, label: "Mobile" },
                { icon: <MonitorCheck className="w-6 h-6" />, label: "Tablette" }
            ]
        },
        {
            title: "Paiements Sans Contact",
            subtitle: "TECHNOLOGIE NFC",
            desc: "Payez en toute simplicité avec Apple Pay, Google Pay ou votre carte sans contact. Sécurisé, rapide et sans frais supplémentaires pour tous nos clients Premium.",
            image: "/assets/carousel_mobile.png",
            icons: [
                { icon: <Wifi className="w-6 h-6" />, label: "NFC" },
                { icon: <Smartphone className="w-6 h-6" />, label: "Apple Pay" },
                { icon: <Smartphone className="w-6 h-6" />, label: "Google Pay" }
            ]
        },
        {
            title: "Sécurité Maximale",
            subtitle: "DÉFENSE CYBERNÉTIQUE",
            desc: "Vos données sont protégées par un chiffrement militaire. Authentification biométrique, alertes en temps réel et 3D Secure pour tous vos achats en ligne.",
            image: "/assets/carousel_security.png",
            icons: [
                { icon: <ShieldCheck className="w-6 h-6" />, label: "Protection" },
                { icon: <Lock className="w-6 h-6" />, label: "Cryptage" },
                { icon: <MonitorCheck className="w-6 h-6" />, label: "Veille 24/7" }
            ]
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-brand-900 dark:to-[#001226] relative overflow-hidden transition-colors duration-300">
            {}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/5 skew-x-12 transform origin-top-right"></div>

            <div className="container mx-auto px-6 relative z-10">
                <RevealOnScroll className="text-center mb-16">
                    <span className="text-brand-gold font-bold tracking-widest uppercase text-xs mb-2 block">Innovation</span>
                    <h2 className="text-4xl font-bold text-brand-900 dark:text-white mb-6">Une Expérience Réinventée</h2>
                    <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full mt-8"></div>
                </RevealOnScroll>

                <div className="max-w-6xl mx-auto bg-white dark:bg-white/5 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-white/10 relative min-h-[500px] flex items-center">

                    {}
                    <button onClick={prevSlide} className="absolute left-4 z-20 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-brand-900 dark:text-white transition-all shadow-lg hidden md:block group">
                        <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <button onClick={nextSlide} className="absolute right-4 z-20 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-brand-900 dark:text-white transition-all shadow-lg hidden md:block group">
                        <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {}
                    <div className="relative w-full h-full flex items-center justify-center p-8 md:p-12">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out px-12 py-8 flex flex-col md:flex-row items-center gap-12 ${index === currentSlide
                                        ? 
                                        : index < currentSlide
                                            ? 
                                            : 
                                    }`}
                            >
                                {}
                                <div className="md:w-1/2 space-y-6 text-left">
                                    <span className="text-brand-gold font-bold tracking-wider text-sm uppercase border border-brand-gold/30 px-3 py-1 rounded-full inline-block">
                                        {slide.subtitle}
                                    </span>
                                    <h3 className="text-4xl md:text-5xl font-bold text-brand-900 dark:text-white leading-tight">
                                        {slide.title}
                                    </h3>
                                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {slide.desc}
                                    </p>

                                    {}
                                    <div className="flex gap-8 pt-6 border-t border-slate-100 dark:border-white/10">
                                        {slide.icons.map((item, i) => (
                                            <div key={i} className="text-center group">
                                                <div className="w-14 h-14 mx-auto bg-slate-50 dark:bg-white/10 rounded-2xl flex items-center justify-center text-brand-900 dark:text-white mb-2 group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-brand-900 transition-all duration-300 shadow-sm">
                                                    {item.icon}
                                                </div>
                                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{item.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {}
                                <div className="md:w-1/2 flex justify-center relative">
                                    <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-white/10 transform rotate-1 hover:rotate-0 transition-transform duration-500 w-full max-w-md">
                                        <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800 relative">
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="w-full h-full object-cover"
                                            />
                                            {}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-black/0 via-white/10 to-white/30 pointer-events-none"></div>
                                        </div>
                                    </div>
                                    {}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-gold/20 blur-3xl rounded-full -z-10 animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ?  : 
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceNumerique;
