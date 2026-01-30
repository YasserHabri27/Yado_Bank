import { X, UserPlus, HelpCircle, MessageSquare, Phone, LayoutDashboard, Users, CreditCard, ArrowRight } from ;
import { useAuth } from ;
import { Link } from ;
import { useLangue } from ;

const Sidebar = ({ isOpen, onClose }) => {
    const { utilisateur } = useAuth();
    const { t } = useLangue();

    
    const isClient = utilisateur?.role === ;
    const isAgent = utilisateur?.role === ;
    const isAdmin = utilisateur?.role === ;
    const isPublic = !utilisateur;

    return (
        <>
            {}
            <div
                className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ?  : }`}
                onClick={onClose}
            ></div>

            {}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-[#001F3F] text-white z-[70] transform transition-transform duration-300 shadow-2xl ${isOpen ?  : }`}
            >
                {}
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold text-brand-gold">{t()}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {}
                <div className="p-6 space-y-2">

                    {}
                    {isAdmin && (
                        <>
                            <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">{t()}</div>
                            <Link to="/admin/tableau-bord" onClick={onClose} className="flex items-center gap-4 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-xl transition-colors text-brand-gold">
                                <LayoutDashboard className="w-5 h-5" />
                                {t()}
                            </Link>
                        </>
                    )}

                    {}
                    {isAgent && (
                        <>
                            <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">{t()}</div>
                            <Link to="/agent/tableau-bord" onClick={onClose} className="flex items-center gap-4 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-xl transition-colors text-brand-gold">
                                <LayoutDashboard className="w-5 h-5" />
                                {t()}
                            </Link>
                            <Link to="/agent/ajouter-client" onClick={onClose} className="flex items-center gap-4 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-xl transition-colors">
                                <Users className="w-5 h-5" />
                                {t()}
                            </Link>
                        </>
                    )}

                    {}
                    {isClient && (
                        <>
                            <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">{t()}</div>
                            <Link to="/client/tableau-bord" onClick={onClose} className="flex items-center gap-4 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-xl transition-colors text-brand-gold">
                                <LayoutDashboard className="w-5 h-5" />
                                {t()}
                            </Link>
                            <Link to="/client/virement" onClick={onClose} className="flex items-center gap-4 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-xl transition-colors">
                                <CreditCard className="w-5 h-5" />
                                {t()}
                            </Link>
                        </>
                    )}

                    {}
                    {isPublic && (
                        <>
                            <a href="/connexion" className="flex items-center gap-4 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-xl transition-colors group">
                                <UserPlus className="w-5 h-5 text-brand-gold group-hover:scale-110 transition-transform" />
                                {t()}
                            </a>

                            <a href="/#comment-ca-marche" onClick={onClose} className="flex items-center gap-4 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-xl transition-colors group">
                                <HelpCircle className="w-5 h-5 text-brand-gold group-hover:scale-110 transition-transform" />
                                {t()}
                            </a>

                            <a href="/#faq" onClick={onClose} className="flex items-center gap-4 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-xl transition-colors group">
                                <MessageSquare className="w-5 h-5 text-brand-gold group-hover:scale-110 transition-transform" />
                                {t()}
                            </a>

                            <a href="/#contact" onClick={onClose} className="flex items-center gap-4 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-xl transition-colors group">
                                <Phone className="w-5 h-5 text-brand-gold group-hover:scale-110 transition-transform" />
                                {t()}
                            </a>
                        </>
                    )}
                </div>

                {}
                {!isPublic && (
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-[#001830] border-t border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold">
                                {utilisateur.nomUtilisateur.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-white text-sm font-bold truncate w-40">{utilisateur.nomUtilisateur}</p>
                                <p className="text-slate-400 text-xs uppercase">{utilisateur.role.replace(, )}</p>
                            </div>
                        </div>
                    </div>
                )}

                {}
                {isPublic && (
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-[#001830] border-t border-white/10">
                        <a href="/#contact" onClick={onClose} className="block bg-gradient-to-r from-brand-gold to-yellow-500 rounded-xl p-4 text-center relative group transition-transform active:scale-95">
                            <p className="text-brand-900 font-bold mb-1">{t()}</p>
                            <p className="text-brand-900/80 text-sm">{t()}</p>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight className="w-4 h-4 text-brand-950 -rotate-45" />
                            </div>
                        </a>
                    </div>
                )}
            </div>
        </>
    );
};

export default Sidebar;
