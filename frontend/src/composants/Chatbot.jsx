import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, ChevronRight, HelpCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../contexte/ContexteAuth';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
    const { utilisateur } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Bonjour ! Je suis Yado Bot. Comment puis-je vous aider aujourd\'hui ?' }
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

    // Close when clicking outside
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

        // Navigation Logic
        if (lowerText.includes('connexion') || lowerText.includes('connecter')) {
            return { text: "Vous pouvez accéder à votre espace client en cliquant ici.", action: () => navigate('/connexion') };
        }
        if (lowerText.includes('inscription') || lowerText.includes('ouvrir') || lowerText.includes('créer')) {
            return { text: "Excellente décision ! Je vous redirige vers la page d'inscription.", action: () => navigate('/connexion') }; // Assuming signup is same/similar or handled via login for now
        }
        if (lowerText.includes('contact') || lowerText.includes('téléphone')) {
            return { text: "Vous pouvez nous contacter via le formulaire en bas de page ou au 05 22 00 00 00.", action: () => window.location.href = '#contact' };
        }

        // Knowledge Base
        if (lowerText.includes('tarif') || lowerText.includes('frais') || lowerText.includes('prix')) {
            return { text: "Nos tarifs sont transparents :\n- Compte Standard : 0 DH/mois\n- Compte Premium : 50 DH/mois\n- Virements : Gratuits." };
        }
        if (lowerText.includes('crédit') || lowerText.includes('prêt') || lowerText.includes('emprunt')) {
            return { text: "Nous proposons des crédits immobiliers (taux dès 3.5%) et consommation. Souhaitez-vous une simulation ?" };
        }
        if (lowerText.includes('carte') || lowerText.includes('visa') || lowerText.includes('mastercard')) {
            return { text: "Nous offrons des cartes Visa Gold et Platinum avec plafond personnalisable et paiements sans contact." };
        }
        if (lowerText.includes('sécurité') || lowerText.includes('fiable')) {
            return { text: "La sécurité est notre priorité : chiffrement 256-bit, 3D Secure et blocage instantané via l'app." };
        }
        if (lowerText.includes('agence') || lowerText.includes('adresse')) {
            return { text: "Nous sommes une banque 100% en ligne, mais notre siège est à Casablanca. Tout est gérable depuis votre mobile." };
        }

        // Small Talk
        if (lowerText.includes('bonjour') || lowerText.includes('salut') || lowerText.includes('hello')) {
            return { text: `Bonjour ${utilisateur ? utilisateur.nomUtilisateur : ''} ! En quoi puis-je vous être utile ?` };
        }
        if (lowerText.includes('merci')) {
            return { text: "Je vous en prie ! N'hésitez pas si vous avez d'autres questions." };
        }
        if (lowerText.includes('ca va') || lowerText.includes('ça va')) {
            return { text: "Je suis un robot, donc toujours en forme ! Et vous ?" };
        }

        // Default
        return { text: "Je ne suis pas sûr de comprendre. Vous pouvez me demander des infos sur les comptes, crédits, tarifs ou la sécurité." };
    };

    const handleSend = (text = inputValue) => {
        if (!text.trim()) return;

        // User Message
        const newMessages = [...messages, { type: 'user', text }];
        setMessages(newMessages);
        setInputValue("");
        setIsTyping(true);

        // Simulate Bot Intelligence delay
        setTimeout(() => {
            const response = findResponse(text);
            setMessages(prev => [...prev, { type: 'bot', text: response.text }]);
            setIsTyping(false);

            if (response.action) {
                setTimeout(() => response.action(), 1000);
            }
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div ref={chatbotRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white dark:bg-[#001830] w-80 sm:w-96 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden mb-4 animate-slide-up origin-bottom-right flex flex-col max-h-[600px] h-[500px]">
                    {/* Header */}
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

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-[#001226]/50 scroll-smooth">
                        <div className="text-center text-xs text-slate-400 my-2 font-medium tracking-wider">AUJOURD'HUI</div>

                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                                <div
                                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.type === 'user'
                                        ? 'bg-gradient-to-br from-brand-gold to-yellow-500 text-brand-900 font-semibold rounded-tr-none'
                                        : 'bg-white dark:bg-[#001F3F] border border-slate-100 dark:border-white/10 text-slate-700 dark:text-slate-200 rounded-tl-none'}`}
                                >
                                    {msg.text.split('\n').map((line, i) => (
                                        <p key={i} className={i > 0 ? "mt-1" : ""}>{line}</p>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex justify-start animate-fade-in">
                                <div className="bg-white dark:bg-[#001F3F] border border-slate-100 dark:border-white/10 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-0"></div>
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-300"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Replies */}
                    <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar bg-white dark:bg-[#001830] border-t border-slate-100 dark:border-white/5 shrink-0">
                        {quickReplies.map((reply, index) => (
                            <button
                                key={index}
                                onClick={() => handleSend(reply)}
                                className="whitespace-nowrap px-4 py-2 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl hover:bg-brand-gold hover:text-brand-900 transition-all border border-slate-200 dark:border-white/10 shadow-sm"
                            >
                                {reply}
                            </button>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white dark:bg-[#001830] border-t border-slate-100 dark:border-white/10 shrink-0">
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Écrivez votre message..."
                                className="flex-1 bg-slate-100 dark:bg-[#001226] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-gold/50 outline-none dark:text-white placeholder-slate-400 transition-all"
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={!inputValue.trim() || isTyping}
                                className="p-3 bg-brand-900 dark:bg-brand-gold text-white dark:text-brand-900 rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed transition-all shadow-lg"
                            >
                                {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 rtl:rotate-180" />}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="group flex items-center gap-3 bg-brand-900 text-white pl-6 pr-2 py-2 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border border-brand-gold/30"
                >
                    <div className="hidden group-hover:block animate-fade-in text-right pr-2">
                        <p className="font-bold text-sm leading-tight">Besoin d'aide ?</p>
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
