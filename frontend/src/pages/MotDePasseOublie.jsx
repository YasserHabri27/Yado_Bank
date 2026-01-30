import { useState } from ;
import { Link } from ;
import { Key, ArrowRight, CheckCircle, AlertCircle, Mail } from ;
import api from ;

const MotDePasseOublie = () => {
    const [identifiant, setIdentifiant] = useState();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(); 
    const [message, setMessage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus();
        setMessage();

        
        if (!identifiant.toLowerCase().endsWith()) {
            setStatus();
            setMessage("Pour des raisons techniques, seules les adresses @gmail.com sont acceptées.");
            setLoading(false);
            return;
        }

        try {
            
            await api.post(, { identifiant });
            setStatus();
            setMessage();
        } catch (error) {
            setStatus();
            setMessage(error.response?.data || "Une erreur est survenue. Veuillez vérifier votre identifiant.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#001226] flex items-center justify-center p-4 relative overflow-hidden">
            {}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 w-full max-w-md animate-fade-in">
                <div className="bg-[#001F3F] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">

                    {}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
                            <Key className="w-10 h-10 text-brand-gold" />
                        </div>
                    </div>

                    {}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">Mot de passe oublié ?</h1>
                        <p className="text-slate-400 text-sm">
                            Entrez votre adresse Gmail pour recevoir votre code de réinitialisation.
                        </p>
                    </div>

                    {}
                    {status !==  ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">Adresse Gmail</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-brand-gold transition-colors" />
                                    <input
                                        type="email"
                                        value={identifiant}
                                        onChange={(e) => setIdentifiant(e.target.value)}
                                        placeholder="exemple@gmail.com"
                                        className="w-full bg-[#001226] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-600 focus:border-brand-gold/50 focus:outline-none focus:bg-[#001830] transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {status ===  && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 animate-shake">
                                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-200">{message}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-brand-gold hover:bg-yellow-500 text-brand-950 font-bold py-4 rounded-xl transition-all shadow-lg shadow-brand-gold/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? "Envoi en cours..." : "Envoyer le lien"}
                                {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center space-y-6 animate-scale-in">
                            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                                <p className="text-green-400 text-sm font-medium">{message}</p>
                            </div>
                            <p className="text-slate-400 text-sm">
                                Veuillez consulter votre boîte mail (et vos spams).
                            </p>
                        </div>
                    )}

                    {}
                    <div className="mt-8 text-center">
                        <Link to="/connexion" className="text-slate-500 hover:text-white transition-colors text-sm flex items-center justify-center gap-2">
                            <ArrowRight className="w-4 h-4 rotate-180" />
                            Retour à la connexion
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MotDePasseOublie;
