import { Quote, Star } from 'lucide-react';
import { useLangue } from '../contexte/ContexteLangue';

const Temoignages = () => {
    const { t } = useLangue();

    const testimonials = [
        {
            name: "Karim Benchara",
            role: "Entrepreneur",
            content: "Yado Bank a transformé la gestion financière de mon entreprise. L'interface est intuitive et le service client est digne d'une conciergerie de luxe.",
            rating: 5,
            initial: "K"
        },
        {
            name: "Sarah El Amrani",
            role: "Investisseuse",
            content: "La sécurité et la rapidité des transactions sont incomparables. C'est la première fois que je me sens vraiment valorisée par ma banque.",
            rating: 5,
            initial: "S"
        },
        {
            name: "Mehdi Tazi",
            role: "Architecte",
            content: "Le design de l'application est magnifique, mais c'est surtout l'efficacité des conseillers qui me fidélise. Une banque moderne pour le Maroc moderne.",
            rating: 5,
            initial: "M"
        },
        {
            name: "Amina Berrada",
            role: "Médecin",
            content: "Des services premium accessibles en un clic. J'apprécie particulièrement la gestion de patrimoine personnalisée.",
            rating: 5,
            initial: "A"
        },
        {
            name: "Omar Kabbaj",
            role: "CEO Start-up",
            content: "L'innovation est au cœur de Yado Bank. Les outils de gestion m'aident à prendre les bonnes décisions pour mon business.",
            rating: 4,
            initial: "O"
        },
        {
            name: "Leila Hassar",
            role: "Freelance",
            content: "Enfin une banque qui comprend les besoins des indépendants. Flexibilité, écoute et professionnalisme.",
            rating: 5,
            initial: "L"
        }
    ];

    return (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-brand-900 pt-24 pb-12 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <p className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-3">
                        Témoignages
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold text-brand-900 dark:text-white mb-6">
                        La confiance de nos clients
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                        Découvrez pourquoi Yado Bank est le choix privilégié des entrepreneurs et des particuliers exigeants.
                    </p>
                    <div className="w-20 h-1.5 bg-brand-gold mx-auto mt-8 rounded-full"></div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
                        >
                            {/* Card Header: Initial + Stars */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 bg-brand-gold/20 text-brand-gold rounded-full flex items-center justify-center font-bold text-xl">
                                    {item.initial}
                                </div>
                                <div className="flex gap-1 text-brand-gold">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < item.rating ? 'fill-current' : 'text-slate-300 dark:text-slate-600'}`} />
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative mb-6 flex-grow">
                                <Quote className="absolute -top-2 -left-2 w-6 h-6 text-brand-gold/20 transform -scale-x-100" />
                                <p className="text-slate-600 dark:text-slate-300 italic pl-4 leading-relaxed relative z-10">
                                    "{item.content}"
                                </p>
                            </div>

                            {/* Author */}
                            <div className="border-t border-slate-100 dark:border-white/10 pt-4 mt-auto">
                                <h4 className="font-bold text-brand-900 dark:text-white text-lg">{item.name}</h4>
                                <span className="text-brand-gold text-xs font-bold uppercase tracking-wide">{item.role}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 text-center">
                    <div className="inline-block p-8 rounded-3xl bg-white dark:bg-white/5 border border-brand-gold/20 shadow-xl backdrop-blur-sm max-w-4xl w-full">
                        <h3 className="text-2xl font-bold text-brand-900 dark:text-white mb-4">Rejoignez l'élite</h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-xl mx-auto">
                            Ouvrez votre compte en ligne en moins de 5 minutes et profitez d'une expérience bancaire réinventée.
                        </p>
                        <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <span className="text-lg font-bold text-slate-400">Forbes</span>
                            <span className="text-lg font-bold text-slate-400">TechCrunch</span>
                            <span className="text-lg font-bold text-slate-400">Bloomberg</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Temoignages;
