import { useState, useEffect } from 'react';
import { useAuth } from '../contexte/ContexteAuth';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Lock, User, ArrowRight, Loader2, Briefcase, ShieldAlert } from 'lucide-react';
import { useLangue } from '../contexte/ContexteLangue';
import RevealOnScroll from '../composants/RevealOnScroll';

const Connexion = () => {
    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [erreur, setErreur] = useState('');
    const [loading, setLoading] = useState(false);
    const [isAgent, setIsAgent] = useState(false);
    const { login, deconnexion } = useAuth();
    const { t } = useLangue();
    const navigate = useNavigate();

    const navigate = useNavigate();

    useEffect(() => {
        setNomUtilisateur('');
        setMotDePasse('');
        setErreur('');
    }, [isAgent]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErreur('');
        setLoading(true);
        try {
        try {
            const userData = await login(nomUtilisateur, motDePasse);
            const role = userData.role;

            if (!isAgent && (role === 'ROLE_AGENT_GUICHET' || role === 'ROLE_ADMIN')) {
                deconnexion();
                throw new Error("Accès refusé : Veuillez utiliser l'Espace Pro.");
            }
            if (isAgent && role === 'ROLE_CLIENT') {
                deconnexion();
                throw new Error("Accès refusé : Veuillez utiliser l'Espace Client.");
            }

            if (role === 'ROLE_AGENT_GUICHET') {
                navigate('/agent/tableau-bord');
            } else if (role === 'ROLE_ADMIN') {
                navigate('/admin/tableau-bord');
            } else {
                navigate('/');
            }
        } catch (err) {
            if (err.message && err.message.includes("Accès refusé")) {
                setErreur(err.message);
            } else {
                setErreur('Login ou mot de passe erronés');
            }
        } finally {
            setLoading(false);
        }
    };

    // Dynamic Styles based on Role
    const activeTabStyle = isAgent
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
        : "bg-brand-bp text-white shadow-lg shadow-brand-bp/30";

    const cardStyle = isAgent
        ? "border-indigo-500/30 shadow-indigo-900/20"
        : "border-slate-100 dark:border-white/10 shadow-2xl";

    return (
        <RevealOnScroll className="flex-grow flex items-center justify-center p-4 relative overflow-hidden bg-slate-50 dark:bg-brand-900 transition-colors duration-300 w-full rounded-3xl my-8">
            {/* Background Pattern */}
            <div className={`absolute inset-0 opacity-5 transition-colors duration-500 ${isAgent ? 'bg-indigo-900' : 'bg-[#003366]'}`} style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            <div className={`bg-white dark:bg-brand-dark p-2 rounded-3xl w-full max-w-md relative z-10 border transition-all duration-500 ${cardStyle} animate-fade-in`}>

                {/* Role Switcher */}
                <div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-2xl mb-8">
                    <button
                        onClick={() => setIsAgent(false)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${!isAgent ? activeTabStyle : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                    >
                        <User className="w-4 h-4" />
                        {t('login.tabClient')}
                    </button>
                    <button
                        onClick={() => setIsAgent(true)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${isAgent ? activeTabStyle : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                    >
                        <Briefcase className="w-4 h-4" />
                        Espace Pro
                    </button>
                </div>

                <div className="px-8 pb-8">
                    <div className="text-center mb-8">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-500 ${isAgent ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400' : 'bg-brand-bp/10 dark:bg-white/10 text-brand-bp dark:text-brand-gold'}`}>
                            {isAgent ? <ShieldAlert className="w-8 h-8" /> : <Building2 className="w-8 h-8" />}
                        </div>
                        <h2 className="text-3xl font-bold text-brand-900 dark:text-white mb-2 tracking-tight transition-all">
                            {isAgent ? t('login.agentTitle') : t('login.title')}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 transition-all">
                            {isAgent ? t('login.agentSubtitle') : t('login.subtitle')}
                        </p>
                    </div>

                    {erreur && (
                        <div className="bg-red-50 dark:bg-red-500/10 border-l-4 border-red-500 p-4 mb-6 rounded-r-xl animate-shake">
                            <p className="text-red-700 dark:text-red-400 text-sm font-medium">{erreur}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isAgent ? 'text-indigo-600 dark:text-indigo-400' : 'text-brand-900 dark:text-brand-gold'}`}>
                                {isAgent ? "Identifiant Agent" : t('common.email')}
                            </label>
                            <div className="relative group">
                                <User className={`w-5 h-5 absolute left-4 top-3.5 transition-colors ${isAgent ? 'text-indigo-300 group-focus-within:text-indigo-600' : 'text-slate-400 group-focus-within:text-brand-bp dark:group-focus-within:text-brand-gold'}`} />
                                <input
                                    type="text"
                                    className={`w-full bg-slate-50 dark:bg-white/5 border rounded-xl pl-12 pr-4 py-3 text-brand-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-all ${isAgent ? 'border-indigo-200 dark:border-indigo-900/50 focus:border-indigo-600 focus:ring-indigo-600' : 'border-slate-200 dark:border-white/10 focus:border-brand-bp dark:focus:border-brand-gold focus:ring-brand-bp dark:focus:ring-brand-gold'}`}
                                    placeholder={isAgent ? "A-12345" : t('login.usernamePlaceholder')}
                                    value={nomUtilisateur}
                                    onChange={(e) => setNomUtilisateur(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isAgent ? 'text-indigo-600 dark:text-indigo-400' : 'text-brand-900 dark:text-brand-gold'}`}>
                                {t('common.password')}
                            </label>
                            <div className="relative group">
                                <Lock className={`w-5 h-5 absolute left-4 top-3.5 transition-colors ${isAgent ? 'text-indigo-300 group-focus-within:text-indigo-600' : 'text-slate-400 group-focus-within:text-brand-bp dark:group-focus-within:text-brand-gold'}`} />
                                <input
                                    type="password"
                                    className={`w-full bg-slate-50 dark:bg-white/5 border rounded-xl pl-12 pr-4 py-3 text-brand-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-all ${isAgent ? 'border-indigo-200 dark:border-indigo-900/50 focus:border-indigo-600 focus:ring-indigo-600' : 'border-slate-200 dark:border-white/10 focus:border-brand-bp dark:focus:border-brand-gold focus:ring-brand-bp dark:focus:ring-brand-gold'}`}
                                    placeholder={t('login.passwordPlaceholder')}
                                    value={motDePasse}
                                    onChange={(e) => setMotDePasse(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-white ${isAgent ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20' : 'bg-brand-bp hover:bg-brand-800 dark:bg-brand-gold dark:text-brand-900 dark:hover:bg-brand-gold-light'}`}
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {t('login.loginBtn')}
                                    <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                                </>
                            )}
                        </button>
                    </form>

                    {!isAgent && (
                        <div className="flex justify-end">
                            <Link to="/mot-de-passe-oublie" className="text-sm font-medium text-brand-gold hover:text-white transition-colors">
                                {t('login.forgotPassword')}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </RevealOnScroll>
    );
};

export default Connexion;
