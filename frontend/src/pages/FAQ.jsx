import { useState } from ;
import RevealOnScroll from ;
import { ChevronDown, HelpCircle } from ;

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-200 dark:border-white/10">
            <button
                className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-4">
                    <HelpCircle className="w-5 h-5 text-brand-gold shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-lg font-bold text-brand-900 dark:text-white group-hover:text-brand-gold transition-colors">
                        {question}
                    </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ?  : }`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ?  : }`}>
                <p className="text-slate-600 dark:text-slate-300 pl-9 leading-relaxed">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            question: "L'ouverture de compte est-elle vraiment gratuite ?",
            answer: "Oui, l'ouverture de compte est 100% gratuite. Aucun frais de dossier n'est appliqué pour le compte Standard."
        },
        {
            question: "Quels documents dois-je fournir ?",
            answer: "Une simple Carte Nationale d'Identité (CIN) ou un passeport valide et un justificatif de domicile de moins de 3 mois."
        },
        {
            question: "Puis-je utiliser ma carte à l'international ?",
            answer: "Absolument. Nos cartes Premium et Gold incluent les paiements et retraits internationaux avec une dotation e-commerce activable instantanément."
        },
        {
            question: "Comment contacter le service client ?",
            answer: "Notre Chatbot est disponible 24/7. Vous pouvez aussi parler à un conseiller humain du lundi au vendredi de 8h à 18h par téléphone ou chat vidéo."
        },
        {
            question: "Mes données sont-elles sécurisées ?",
            answer: "Nous utilisons le chiffrement de bout en bout et l'authentification biométrique. Yado Bank est conforme aux normes bancaires internationales les plus strictes."
        }
    ];

    return (
        <section id="faq" className="py-20 bg-slate-50 dark:bg-brand-900 transition-colors duration-300">
            <div className="container mx-auto px-6 max-w-4xl">
                <RevealOnScroll className="text-center mb-16">
                    <span className="text-brand-gold font-bold tracking-widest uppercase text-xs mb-2 block">Aide</span>
                    <h2 className="text-4xl font-bold text-brand-900 dark:text-white mb-6">Questions Fréquentes</h2>
                    <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full mt-8"></div>
                </RevealOnScroll>

                <RevealOnScroll>
                    <div className="bg-white dark:bg-[#001830] rounded-3xl shadow-xl border border-slate-100 dark:border-white/10 p-8 md:p-12">
                        {faqs.map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default FAQ;
