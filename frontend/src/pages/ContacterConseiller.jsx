import { useState } from 'react';
import { User, Mail, MessageSquare, Send, ArrowLeft, CheckCircle2 } from 'lucide-react';

const ContacterConseiller = () => {
    const [step, setStep] = useState(1);
    const [selectedAdvisor, setSelectedAdvisor] = useState(null);
    const [formData, setFormData] = useState({ subject: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const advisors = [
        {
            id: 'yasser',
            name: 'Yasser Habri',
            role: 'Directeur Technique & Co-Fondateur',
            email: 'yasser.habri.dev2@gmail.com',
            initials: 'YH',
            color: 'blue'
        },
        {
            id: 'doha',
            name: 'Doha Allali',
            role: 'Directrice Générale & Co-Fondatrice',
            email: 'dauphinellebleue@gmail.com',
            initials: 'DA',
            color: 'gold'
        }
    ];

    const handleSelect = (advisor) => {
        setSelectedAdvisor(advisor);
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        // Simulate sending
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSending(false);
        setSent(true);
    };

    const reset = () => {
        setStep(1);
        setSelectedAdvisor(null);
        setSent(false);
        setFormData({ subject: '', message: '' });
    };

    return (
        <div className="py-12 max-w-4xl mx-auto min-h-[600px] animate-fade-in">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-brand-900 dark:text-white mb-4">Contacter un Conseiller Expert</h2>
                <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full"></div>
            </div>

            {step === 1 && (
                <div className="grid md:grid-cols-2 gap-8 px-4">
                    {advisors.map((advisor) => (
                        <div
                            key={advisor.id}
                            onClick={() => handleSelect(advisor)}
                            className="bg-white dark:bg-brand-dark p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-white/10 cursor-pointer hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                        >
                            <div className={`absolute top-0 left-0 w-full h-2 ${advisor.color === 'gold' ? 'bg-brand-gold' : 'bg-brand-bp'}`}></div>

                            <div className="flex flex-col items-center text-center">
                                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-lg ${advisor.color === 'gold'
                                        ? 'bg-brand-gold text-brand-900'
                                        : 'bg-brand-bp text-white'
                                    }`}>
                                    {advisor.initials}
                                </div>
                                <h3 className="text-2xl font-bold text-brand-900 dark:text-white mb-2">{advisor.name}</h3>
                                <p className="text-brand-gold font-bold text-sm uppercase tracking-wider mb-4">{advisor.role}</p>
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                    <Mail className="w-4 h-4" />
                                    {advisor.email}
                                </div>
                                <button className="mt-8 px-6 py-2 rounded-xl bg-slate-50 dark:bg-white/5 text-brand-900 dark:text-white font-bold group-hover:bg-brand-gold group-hover:text-brand-900 transition-colors">
                                    Choisir ce conseiller
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {step === 2 && !sent && (
                <div className="bg-white dark:bg-brand-dark p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 dark:border-white/10 max-w-2xl mx-auto relative animate-slide-up">
                    <button
                        onClick={() => setStep(1)}
                        className="absolute top-8 left-8 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-500"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>

                    <div className="text-center mb-8">
                        <p className="text-slate-500 dark:text-slate-400 mb-1">Nouveau message pour</p>
                        <h3 className="text-2xl font-bold text-brand-900 dark:text-white">{selectedAdvisor.name}</h3>
                        <p className="text-xs text-brand-gold mt-1">{selectedAdvisor.email}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-brand-900 dark:text-white ml-1">Sujet</label>
                            <input
                                type="text"
                                required
                                className="w-full input-premium bg-slate-50 dark:bg-brand-950"
                                placeholder="Objet de votre demande"
                                value={formData.subject}
                                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-brand-900 dark:text-white ml-1">Message</label>
                            <textarea
                                rows="6"
                                required
                                className="w-full input-premium bg-slate-50 dark:bg-brand-950 resize-none"
                                placeholder="Décrivez votre problème en détail..."
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={sending}
                            className="w-full btn-premium py-4 flex items-center justify-center gap-2"
                        >
                            {sending ? 'Envoi en cours...' : 'Envoyer le message'}
                            {!sending && <Send className="w-5 h-5" />}
                        </button>
                    </form>
                </div>
            )}

            {sent && (
                <div className="bg-white dark:bg-brand-dark p-12 rounded-3xl shadow-xl border border-slate-100 dark:border-white/10 max-w-xl mx-auto text-center animate-slide-up">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-900 dark:text-white mb-4">Message Envoyé !</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">
                        Votre message a bien été transmis à <strong>{selectedAdvisor.name}</strong>.<br />
                        Une réponse vous sera envoyée à votre adresse email dans les plus brefs délais.
                    </p>
                    <button
                        onClick={reset}
                        className="bg-brand-gold text-brand-900 font-bold py-3 px-8 rounded-xl hover:bg-white hover:shadow-lg transition-all"
                    >
                        Retour à l'accueil
                    </button>
                </div>
            )}
        </div>
    );
};

export default ContacterConseiller;
