import { useState } from ;
import api from ;
import { useNavigate } from ;
import { ArrowLeft, User, CreditCard, DollarSign, Loader2 } from ;
import { Link } from ;

const AjouterCompte = () => {
    const navigate = useNavigate();
    const [chargement, setChargement] = useState(false);
    const [donneesFormulaire, setDonneesFormulaire] = useState({
        rib: ,
        soldeInitial: ,
        numeroIdentiteClient: 
    });
    const [message, setMessage] = useState({ type: , text:  });

    const gererChangement = (e) => {
        setDonneesFormulaire({ ...donneesFormulaire, [e.target.name]: e.target.value });
    };

    const soumettreFormulaire = async (e) => {
        e.preventDefault();
        setChargement(true);
        setMessage({ type: , text:  });

        if (donneesFormulaire.rib.length !== 24) {
            setMessage({ type: , text:  });
            setChargement(false);
            return;
        }

        try {
            await api.post(, donneesFormulaire);
            setMessage({ type: , text:  });
            setTimeout(() => navigate(), 2000);
        } catch (error) {
            const errorMsg = error.response?.data || "Une erreur est survenue";
            setMessage({ type: , text: typeof errorMsg ===  ? errorMsg : JSON.stringify(errorMsg) });
        } finally {
            setChargement(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/agent/tableau-bord" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <span className="text-brand-gold font-bold tracking-wider text-xs uppercase mb-1 block">Gestion Bancaire</span>
                    <h2 className="text-2xl font-bold text-brand-950 dark:text-white tracking-tight">Ouverture de Compte</h2>
                </div>
            </div>

            <div className="glass-panel overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

                <div className="p-10 relative z-10">
                    {message.text && (
                        <div className={`p-4 rounded-xl mb-8 flex items-center gap-3 ${message.type ===  ?  : }`}>
                            {message.type ===  ? <div className="w-2 h-2 rounded-full bg-green-500"></div> : <div className="w-2 h-2 rounded-full bg-red-500"></div>}
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={soumettreFormulaire} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">Numéro d'identité du client (CIN)</label>
                            <div className="relative group">
                                <User className="w-5 h-5 text-slate-500 absolute left-4 top-3.5 group-focus-within:text-brand-gold transition-colors" />
                                <input
                                    type="text"
                                    name="numeroIdentiteClient"
                                    className="input-premium pl-16"
                                    placeholder="ex: AB123456"
                                    value={donneesFormulaire.numeroIdentiteClient}
                                    onChange={gererChangement}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">RIB (24 Caractères)</label>
                            <div className="relative group">
                                <CreditCard className="w-5 h-5 text-slate-500 absolute left-4 top-3.5 group-focus-within:text-brand-gold transition-colors" />
                                <input
                                    type="text"
                                    name="rib"
                                    maxLength={24}
                                    className="input-premium pl-12 uppercase tracking-widest font-mono"
                                    placeholder="XXXXXXXXXXXXXXXXXXXXXXXX"
                                    value={donneesFormulaire.rib}
                                    onChange={gererChangement}
                                    required
                                />
                            </div>
                            <p className="text-xs text-slate-500 text-right font-mono">{donneesFormulaire.rib.length}/24</p>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">Solde Initial</label>
                            <div className="relative group">
                                <DollarSign className="w-5 h-5 text-slate-500 absolute left-4 top-3.5 group-focus-within:text-brand-gold transition-colors" />
                                <input
                                    type="number"
                                    name="soldeInitial"
                                    className="input-premium pl-16 font-mono text-lg"
                                    placeholder="0.00"
                                    value={donneesFormulaire.soldeInitial}
                                    onChange={gererChangement}
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={chargement}
                                className="btn-premium px-10 py-4 flex items-center gap-2 group"
                            >
                                {chargement ? <Loader2 className="w-5 h-5 animate-spin" /> : "Créer le compte"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AjouterCompte;
