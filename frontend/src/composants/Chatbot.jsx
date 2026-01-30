import { useState, useRef, useEffect } from ;
import { MessageSquare, X, Send, User, ChevronRight, HelpCircle, Loader2 } from ;
import { useAuth } from ;
import { useNavigate } from ;

const Chatbot = () => {
    const { utilisateur } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        { type: , text:  }
    ]);
    const [inputValue, setInputValue] = useState("");
    const chatbotRef = useRef(null);
    const messagesEndRef = useRef(null);

    const quickReplies = [
        "Ouvrir un compte",
        "Tarifs & Frais",
        "Problème connexion",
        "Crédit Immobilier"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isTyping]);

    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const findResponse = (text) => {
        const lowerText = text.toLowerCase();

        
        if (lowerText.includes() || lowerText.includes()) {
            return { text: "Vous pouvez accéder à votre espace client en cliquant ici.", action: () => navigate() };
        }
        if (lowerText.includes() || lowerText.includes() || lowerText.includes()) {
            return { text: "Excellente décision ! Je vous redirige vers la page d'inscription.", action: () => navigate() }; 
        }
        if (lowerText.includes() || lowerText.includes()) {
            return { text: "Vous pouvez nous contacter via le formulaire en bas de page ou au 05 22 00 00 00.", action: () => window.location.href =  };
        }

        
        if (lowerText.includes() || lowerText.includes() || lowerText.includes()) {
            return { text: "Nos tarifs sont transparents :\n- Compte Standard : 0 DH/mois\n- Compte Premium : 50 DH/mois\n- Virements : Gratuits." };
        }
        if (lowerText.includes() || lowerText.includes() || lowerText.includes()) {
            return { text: "Nous proposons des crédits immobiliers (taux dès 3.5%) et consommation. Souhaitez-vous une simulation ?" };
        }
        if (lowerText.includes() || lowerText.includes() || lowerText.includes()) {
            return { text: "Nous offrons des cartes Visa Gold et Platinum avec plafond personnalisable et paiements sans contact." };
        }
        if (lowerText.includes() || lowerText.includes()) {
            return { text: "La sécurité est notre priorité : chiffrement 256-bit, 3D Secure et blocage instantané via l'app." };
        }
        if (lowerText.includes() || lowerText.includes()) {
            return { text: "Nous sommes une banque 100% en ligne, mais notre siège est à Casablanca. Tout est gérable depuis votre mobile." };
        }

        
        if (lowerText.includes() || lowerText.includes() || lowerText.includes()) {
            return { text: `Bonjour ${utilisateur ? utilisateur.nomUtilisateur : } ! En quoi puis-je vous être utile ?` };
        }
        if (lowerText.includes()) {
            return { text: "Je vous en prie ! N'hésitez pas si vous avez d'autres questions." };
        }
        if (lowerText.includes() || lowerText.includes()) {
            return { text: "Je suis un robot, donc toujours en forme ! Et vous ?" };
        }

        
        return { text: "Je ne suis pas sûr de comprendre. Vous pouvez me demander des infos sur les comptes, crédits, tarifs ou la sécurité." };
    };

    const handleSend = (text = inputValue) => {
        if (!text.trim()) return;

        
        const newMessages = [...messages, { type: , text }];
        setMessages(newMessages);
        setInputValue("");
        setIsTyping(true);

        
        setTimeout(() => {
            const response = findResponse(text);
            setMessages(prev => [...prev, { type: , text: response.text }]);
            setIsTyping(false);

            if (response.action) {
                setTimeout(() => response.action(), 1000);
            }
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === ) handleSend();
    };

    return (
        <div ref={chatbotRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

            {}
            {isOpen && (
                <div className="bg-white dark:bg-[#001830] w-80 sm:w-96 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden mb-4 animate-slide-up origin-bottom-right flex flex-col max-h-[600px] h-[500px]">
                    {}
                    <div className="bg-brand-900 p-4 flex justify-between items-center text-white shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center relative shadow-md border border-white/20">
                                <span className="text-brand-900 font-bold text-lg">Y</span>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-brand-900 animate-pulse"></div>
                            </div>
                            <div>
                                <h3 className="font-bold tracking-wide">Yado Assistant</h3>
                                <p className="text-[10px] text-brand-gold/80 uppercase tracking-widest flex items-center gap-1">
                                    <span className="w-1 h-1 bg-brand-gold rounded-full inline-block"></span>
                                    Intelligence Artificielle
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-[#001226]/50 scroll-smooth">
                        <div className="text-center text-xs text-slate-400 my-2 font-medium tracking-wider">AUJOURDuserjustify-endjustify-startuserbg-gradient-to-br from-brand-gold to-yellow-500 text-brand-900 font-semibold rounded-tr-nonebg-white dark:bg-[#001F3F] border border-slate-100 dark:border-white/10 text-slate-700 dark:text-slate-200 rounded-tl-none\naide ?</p>
                        <p className="text-[10px] text-brand-gold opacity-80">Réponse immédiate</p>
                    </div>
                    <div className="w-14 h-14 bg-brand-gold rounded-full flex items-center justify-center relative shadow-lg group-hover:rotate-12 transition-transform duration-300">
                        <MessageSquare className="w-7 h-7 text-brand-900" />
                        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full animate-bounce border-2 border-brand-900"></span>
                    </div>
                </button>
            )}
        </div>
    );
};

export default Chatbot;
