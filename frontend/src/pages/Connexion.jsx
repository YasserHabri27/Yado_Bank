import { useState } from 'react';
import { useAuth } from '../contexte/ContexteAuth';
import { useNavigate } from 'react-router-dom';
import { Building2, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

const Connexion = () => {
    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [erreur, setErreur] = useState('');
    const [enChargement, setEnChargement] = useState(false);
    const { connexion } = useAuth();
    const navigate = useNavigate();

    const soumettreFormulaire = async (e) => {
        e.preventDefault();
        setEnChargement(true);
        setErreur('');
        try {
            await connexion(nomUtilisateur, motDePasse);
            // Navigate based on role
            const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
            if (utilisateur.role === 'AGENT_GUICHET') navigate('/agent/tableau-bord');
            else navigate('/client/tableau-bord');
        } catch (err) {
            setErreur('Identifiant ou mot de passe incorrects');
        } finally {
            setEnChargement(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

            <div className="glass-panel w-full max-w-md p-10 relative z-10 animate-fade-in border-t border-white/20">
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-gold to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-brand-gold/30 rotate-3 hover:rotate-6 transition-transform duration-500">
                        <Building2 className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight premium-gradient-text animate-slide-up">Bienvenue</h1>
                    <p className="text-slate-400 animate-slide-up" style={{ animationDelay: '0.1s' }}>Accès Premium Yasser & Doha Bank</p>
                </div>

                {erreur && (
                    <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm flex items-center justify-center backdrop-blur-sm animate-slide-up">
                        {erreur}
                    </div>
                )}

                <form onSubmit={soumettreFormulaire} className="space-y-6">
                    <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">Identifiant</label>
                        <div className="relative group">
                            <User className="w-5 h-5 text-slate-500 absolute left-4 top-3.5 group-focus-within:text-brand-gold transition-colors" />
                            <input
                                type="text"
                                className="input-premium pl-12"
                                placeholder="Nom d'utilisateur"
                                value={nomUtilisateur}
                                onChange={(e) => setNomUtilisateur(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">Mot de passe</label>
                        <div className="relative group">
                            <Lock className="w-5 h-5 text-slate-500 absolute left-4 top-3.5 group-focus-within:text-brand-gold transition-colors" />
                            <input
                                type="password"
                                className="input-premium pl-12"
                                placeholder="••••••••••••"
                                value={motDePasse}
                                onChange={(e) => setMotDePasse(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="pt-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <button
                            type="submit"
                            disabled={enChargement}
                            className="w-full btn-premium py-4 flex items-center justify-center gap-2 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            {enChargement ? (
                                <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                            ) : (
                                <>
                                    <span className="relative z-10">Connexion Sécurisée</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center text-xs text-slate-600 animate-slide-in" style={{ animationDelay: '0.5s' }}>
                    <p>&copy; 2024 Yasser & Doha Bank. Tous droits réservés.</p>
                </div>
            </div>
        </div>
    );
};

export default Connexion;
