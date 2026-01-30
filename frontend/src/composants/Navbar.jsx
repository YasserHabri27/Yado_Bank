import { useState } from ;
import { Link, useNavigate, useLocation } from ;
import { useAuth } from ;
import { useLangue } from ;
import { Building2, LogOut, User, ChevronDown, Menu, X, ArrowRight, ShieldCheck, Home, Layers, Info, Phone, Users2 } from ;
import BoutonTheme from ;
import SelecteurLangue from ;

const Navbar = ({ onOpenSidebar }) => {
    const { utilisateur, deconnexion } = useAuth();
    const { t } = useLangue();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleLogout = () => {
        deconnexion();
        navigate();
    };

    
    const formatRole = (role) => {
        if (!role) return ;
        return role.replace(, ).replace(, );
    };

    return (
        <nav className="bg-white dark:bg-brand-900 border-b border-slate-200 dark:border-white/10 shadow-lg sticky top-0 z-50 transition-colors duration-300 font-sans">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="p-2.5 bg-brand-gold/10 rounded-lg group-hover:bg-brand-gold/20 transition-colors">
                            <img src="/logo.svg" alt="Yado Bank" className="w-7 h-7" />
                        </div>
                        <div className="leading-tight">
                            <h1 className="text-xl font-bold tracking-wide text-brand-900 dark:text-white">
                                Yasser Habri & <span className="text-brand-gold">Doha Allali</span>
                            </h1>
                            <p className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">{t()}</p>
                        </div>
                    </Link>

                    {}
                    <div className="hidden lg:flex items-center gap-8">
                        {}
                        {!utilisateur && (
                            <div className="flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                <a href="/#home" className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                                    <Home className="w-4 h-4" />
                                    {t()}
                                </a>
                                <a href="/#services" className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                                    <Layers className="w-4 h-4" />
                                    {t()}
                                </a>
                                <a href="/#temoignages" className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                                    <Users2 className="w-4 h-4" />
                                    Témoignages
                                </a>
                                <a href="/#apropos" className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                                    <Info className="w-4 h-4" />
                                    {t()}
                                </a>
                                <a href="/#contact" className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                                    <Phone className="w-4 h-4" />
                                    {t()}
                                </a>
                            </div>
                        )}

                        <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-2"></div>

                        <div className="flex items-center gap-2">
                            <SelecteurLangue />
                            <BoutonTheme />
                        </div>

                        {}
                        {utilisateur ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all outline-none border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                                >
                                    <div className="w-10 h-10 rounded-full bg-brand-bp/10 dark:bg-brand-gold/20 flex items-center justify-center text-brand-bp dark:text-brand-gold">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div className="text-left hidden lg:block">
                                        <p className="text-sm font-bold text-brand-900 dark:text-white line-clamp-1">
                                            {utilisateur.nomUtilisateur}
                                        </p>
                                        <p className="text-[10px] uppercase tracking-wider text-brand-gold font-bold">
                                            {formatRole(utilisateur.role)}
                                        </p>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isUserMenuOpen ?  : }`} />
                                </button>

                                {}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-brand-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 overflow-hidden animate-slide-up ring-1 ring-black/5">
                                        <div className="p-5 border-b border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5">
                                            <p className="text-sm font-bold text-brand-900 dark:text-white">{utilisateur.nomUtilisateur}</p>
                                            <p className="text-xs text-brand-gold font-medium mt-1 uppercase">{formatRole(utilisateur.role)}</p>
                                        </div>
                                        <div className="p-2 space-y-1">
                                            <button
                                                onClick={() => {
                                                    navigate();
                                                    setIsUserMenuOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors flex items-center gap-3"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/10 flex items-center justify-center">
                                                    <ShieldCheck className="w-4 h-4" />
                                                </div>
                                                {t()}
                                            </button>
                                            <div className="my-1 border-t border-slate-100 dark:border-white/5"></div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
                                                    <LogOut className="w-4 h-4" />
                                                </div>
                                                {t()}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            
                            <Link
                                to="/connexion"
                                className="bg-brand-bp hover:bg-brand-800 dark:bg-brand-gold dark:text-brand-900 dark:hover:bg-brand-gold-light text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                <User className="w-4 h-4" />
                                {t()}
                            </Link>
                        )}

                        {}
                        <button
                            onClick={onOpenSidebar}
                            className="bg-brand-900 dark:bg-white text-white dark:text-brand-900 p-3 rounded-xl hover:bg-brand-800 dark:hover:bg-slate-200 transition-colors shadow-lg flex items-center gap-2"
                            title="Navigation Rapide"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>

                    {}
                    <button
                        className="lg:hidden p-2 text-slate-600 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 pt-4 border-t border-slate-200 dark:border-white/10 animate-fade-in pb-4">
                        <div className="flex flex-col gap-4">
                            {!utilisateur ? (
                                <>
                                    <Link to="/" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 font-medium text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl">Accueil</Link>
                                    <Link to="/connexion" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 font-bold bg-brand-bp text-white rounded-xl text-center">
                                        Connexion Espace Client
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <div className="px-4 py-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/10">
                                        <p className="text-sm font-bold text-brand-900 dark:text-white">{utilisateur.nomUtilisateur}</p>
                                        <p className="text-xs text-brand-gold uppercase">{formatRole(utilisateur.role)}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            navigate();
                                            setIsMenuOpen(false);
                                        }}
                                        className="px-4 py-3 text-left font-medium text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl"
                                    >
                                        Changer mot de passe
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-3 text-left font-bold text-red-600 bg-red-50 dark:bg-red-500/10 rounded-xl"
                                    >
                                        Déconnexion
                                    </button>
                                </>
                            )}
                            <div className="flex items-center justify-between px-4 pt-2 border-t border-slate-100 dark:border-white/5">
                                <span className="text-sm text-slate-500">Thème</span>
                                <BoutonTheme />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
