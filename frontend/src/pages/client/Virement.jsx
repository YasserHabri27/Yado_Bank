import { useState, useEffect } from ;
import api from ;
import { useNavigate, Link } from ;
import { ArrowLeft, Send, CreditCard, FileText, DollarSign, Loader2, CheckCircle, AlertTriangle, ShieldCheck } from ;

const Virement = () => {
    const navigate = useNavigate();
    const [comptes, setComptes] = useState([]);
    const [chargement, setChargement] = useState(false);
    const [donneesFormulaire, setDonneesFormulaire] = useState({
        ribSource: ,
        ribDestination: ,
        montant: ,
        description: 
    });
    const [message, setMessage] = useState({ type: , text:  });
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        recupererComptes();
    }, []);

    const recupererComptes = async () => {
        try {
            const reponse = await api.get();
            setComptes(reponse.data);
            if (reponse.data.length > 0) {
                setDonneesFormulaire(precedent => ({ ...precedent, ribSource: reponse.data[0].rib }));
            }
        } catch (erreur) {
            console.error("Erreur lors de la récupération des comptes", erreur);
        }
    };

    const gererChangement = (e) => {
        setDonneesFormulaire({ ...donneesFormulaire, [e.target.name]: e.target.value });
    };

    const preValiderFormulaire = (e) => {
        e.preventDefault();
        setMessage({ type: , text:  });

        if (donneesFormulaire.montant <= 0) {
            setMessage({ type: , text:  });
            return;
        }
        if (donneesFormulaire.ribSource === donneesFormulaire.ribDestination) {
            setMessage({ type: , text:  });
            return;
        }

        
        setShowConfirmModal(true);
    };

    const effectuerVirement = async () => {
        setChargement(true);
        setShowConfirmModal(false); 

        try {
            await api.post(, donneesFormulaire);
            setMessage({ type: , text:  });
            setTimeout(() => navigate(), 2000);
        } catch (error) {
            const errorMsg = error.response?.data || "Une erreur est survenue lors du virement.";
            setMessage({ type: , text: typeof errorMsg ===  ? errorMsg : JSON.stringify(errorMsg) });
        } finally {
            setChargement(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 animate-fade-in relative z-0">
            {}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>

            <Link to="/client/tableau-bord" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors font-medium group px-4">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Retour au tableau de bord
            </Link>

            <div className="glass-panel overflow-hidden border-t-4 border-t-brand-gold shadow-2xl mx-4 md:mx-0 relative">
                <div className="p-8 md:p-10 border-b border-white/10 bg-gradient-to-r from-brand-gold/10 to-transparent relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                            <div className="p-3 bg-brand-gold rounded-2xl text-brand-950 shadow-lg shadow-brand-gold/20">
                                <Send className="w-8 h-8" />
                            </div>
                            Virement Bancaire
                        </h2>
                        <p className="text-slate-300 ml-[4.5rem] mt-2 max-w-md">Envoyez de limporte quel compte Yado Bank.</p>
                    </div>
                </div>

                <div className="p-8 md:p-10 bg-black/20">
                    {message.text && (
                        <div className={`p-6 rounded-2xl mb-8 flex items-start gap-4 animate-slide-up shadow-lg ${message.type ===  ?  : }`}>
                            {message.type ===  ? <CheckCircle className="w-6 h-6 shrink-0" /> : <AlertTriangle className="w-6 h-6 shrink-0" />}
                            <div>
                                <h4 className="font-bold mb-1">{message.type ===  ?  : }</h4>
                                <p className="text-sm opacity-90">{message.text}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={preValiderFormulaire} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1 flex items-center gap-2">
                                    <CreditCard className="w-3 h-3" /> Compte à débiter
                                </label>
                                <div className="relative group">
                                    <select
                                        name="ribSource"
                                        className={`w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-4 text-white appearance-none focus:border-brand-gold/50 focus:bg-white/10 focus:outline-none transition-all ${comptes.length > 1 ?  : }`}
                                        value={donneesFormulaire.ribSource}
                                        onChange={gererChangement}
                                        required
                                        disabled={comptes.length <= 1}
                                    >
                                        {comptes.map(cpt => (
                                            <option key={cpt.rib} value={cpt.rib} className="bg-brand-900 text-white">
                                                {cpt.rib} (Solde: {cpt.solde.toLocaleString()} MAD) -- {cpt.statut}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            {}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1 flex items-center gap-2">
                                    <DollarSign className="w-3 h-3" /> Montant
                                </label>
                                <div className="relative group">
                                    <input
                                        type="number"
                                        name="montant"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-4 text-white font-mono text-xl placeholder-slate-600 focus:border-brand-gold/50 focus:bg-white/10 focus:outline-none transition-all"
                                        placeholder="0.00"
                                        value={donneesFormulaire.montant}
                                        onChange={gererChangement}
                                        required
                                        min="1"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">MAD</span>
                                </div>
                            </div>
                        </div>

                        {}
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1 flex items-center gap-2">
                                <Send className="w-3 h-3" /> RIB Destinataire
                            </label>
                            <input
                                type="text"
                                name="ribDestination"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-mono tracking-widest placeholder-slate-600 focus:border-brand-gold/50 focus:bg-white/10 focus:outline-none transition-all"
                                placeholder="XXXXXXXXXXXXXXXXXXXXXXXX"
                                value={donneesFormulaire.ribDestination}
                                onChange={gererChangement}
                                required
                            />
                            <p className="text-xs text-slate-500 ml-1">Saisissez les 24 caractères du RIB sans espaces.</p>
                        </div>

                        {}
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1 flex items-center gap-2">
                                <FileText className="w-3 h-3" /> Motif
                            </label>
                            <input
                                type="text"
                                name="description"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:border-brand-gold/50 focus:bg-white/10 focus:outline-none transition-all"
                                placeholder="Ex: Paiement Loyer Janvier..."
                                value={donneesFormulaire.description}
                                onChange={gererChangement}
                                required
                            />
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={chargement}
                                className="w-full btn-premium py-4 flex items-center justify-center gap-3 text-lg font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-brand-gold/10"
                            >
                                {chargement ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                    <>
                                        <ShieldCheck className="w-5 h-5" />
                                        Vérifier et Envoyer
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {}
            {showConfirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
                    <div className="bg-[#0f172a] border border-white/10 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden animate-slide-up">
                        <div className="p-8 text-center">
                            <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck className="w-10 h-10 text-brand-gold" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Confirmer le virement</h3>
                            <p className="text-slate-400 mb-8 text-sm">Veuillez vérifier les détails ci-dessous avant de valider la transaction irréversible.</p>

                            <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left space-y-4 font-mono text-sm border border-white/5">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-slate-500">Montant:</span>
                                    <span className="text-white font-bold text-lg">{parseFloat(donneesFormulaire.montant).toLocaleString()} MAD</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-slate-500">Vers:</span>
                                    <span className="text-brand-gold break-all text-xs">{donneesFormulaire.ribDestination}</span>
                                </div>
                                <div className="flex justify-between pt-2">
                                    <span className="text-slate-500">Motif:</span>
                                    <span className="text-white">{donneesFormulaire.description}</span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={effectuerVirement}
                                    className="flex-1 py-3 bg-brand-gold hover:bg-yellow-500 text-brand-950 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                                >
                                    Confirmer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Virement;
