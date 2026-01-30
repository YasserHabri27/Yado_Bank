import { useState } from ;
import api from ;
import { Lock, Loader2 } from ;

const ChangerMotDePasse = () => {
    const [donneesFormulaire, setDonneesFormulaire] = useState({
        ancienMotDePasse: ,
        nouveauMotDePasse: ,
        confirmationMotDePasse: 
    });
    const [chargement, setChargement] = useState(false);
    const [message, setMessage] = useState({ type: , text:  });

    const gererChangement = (e) => {
        setDonneesFormulaire({ ...donneesFormulaire, [e.target.name]: e.target.value });
    };

    const soumettreFormulaire = async (e) => {
        e.preventDefault();
        setMessage({ type: , text:  });

        if (donneesFormulaire.nouveauMotDePasse !== donneesFormulaire.confirmationMotDePasse) {
            setMessage({ type: , text:  });
            return;
        }

        setChargement(true);
        try {
            await api.post(, {
                ancienMotDePasse: donneesFormulaire.ancienMotDePasse,
                nouveauMotDePasse: donneesFormulaire.nouveauMotDePasse
            });
            setMessage({ type: , text:  });
            setDonneesFormulaire({ ancienMotDePasse: , nouveauMotDePasse: , confirmationMotDePasse:  });
        } catch (error) {
            const errorMsg = error.response?.data || "Une erreur est survenue";
            setMessage({ type: , text: typeof errorMsg ===  ? errorMsg : JSON.stringify(errorMsg) });
        } finally {
            setChargement(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="bg-slate-900 p-6 text-white text-center">
                    <h2 className="text-xl font-bold flex items-center justify-center gap-2">
                        <Lock className="w-5 h-5 text-brand-gold" />
                        Changer le mot de passe
                    </h2>
                </div>

                <div className="p-8">
                    {message.text && (
                        <div className={`p-4 rounded-lg mb-6 text-sm flex items-center gap-2 ${message.type ===  ?  : }`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={soumettreFormulaire} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Mot de passe actuel</label>
                            <input
                                type="password"
                                name="ancienMotDePasse"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all"
                                value={donneesFormulaire.ancienMotDePasse}
                                onChange={gererChangement}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Nouveau mot de passe</label>
                            <input
                                type="password"
                                name="nouveauMotDePasse"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all"
                                value={donneesFormulaire.nouveauMotDePasse}
                                onChange={gererChangement}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Confirmer le nouveau mot de passe</label>
                            <input
                                type="password"
                                name="confirmationMotDePasse"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all"
                                value={donneesFormulaire.confirmationMotDePasse}
                                onChange={gererChangement}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={chargement}
                            className="w-full py-3 bg-brand-gold hover:bg-yellow-400 text-brand-900 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-4"
                        >
                            {chargement ? <Loader2 className="w-5 h-5 animate-spin" /> : "Mettre à jour le mot de passe"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangerMotDePasse;
