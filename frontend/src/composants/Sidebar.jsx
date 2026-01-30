import { X, UserPlus, HelpCircle, MessageSquare, Phone, LayoutDashboard, Users, CreditCard, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexte/ContexteAuth';
import { Link } from 'react-router-dom';
import { useLangue } from '../contexte/ContexteLangue';

const Sidebar = ({ isOpen, onClose }) => {
    const { utilisateur } = useAuth();
    const { t } = useLangue();

    // Determine Role
    const isClient = utilisateur?.role === 'ROLE_CLIENT';
    const isAgent = utilisateur?.role === 'ROLE_AGENT_GUICHET';
    const isAdmin = utilisateur?.role === 'ROLE_ADMIN';
    const isPublic = !utilisateur;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>

            {/* Sidebar Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-[#001F3F] text-white z-[70] transform transition-transform duration-300 shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold text-brand-gold">{t('navbar.menu')}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Links */}
                <div className="p-6 space-y-2">

                    {/* --- ADMIN LINKS --- */}
                    {isAdmin && (
                        <>
                            <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('sidebar.admin')}</div>
                            <Link to="/admin/tableau-bord" onClick={onClose} className="flex items-center gap-4 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-xl transition-colors text-brand-gold">
                                <LayoutDashboard className="w-5 h-5" />
                                {t('sidebar.dashboard')}
                            </Link>
                        </>
                    )}

                    {/* --- AGENT LINKS --- */}
                    {isAgent && (
                        <>
                            <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('sidebar.agentSpace')}</div>
                            <Link to="/agent/tableau-bord" onClick={onClose} className="flex items-center gap-4 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-xl transition-colors text-brand-gold">
                                <LayoutDashboard className="w-5 h-5" />
                                {t('sidebar.managementConsole')}
                            </Link>
                            <Link to="/agent/ajouter-client" onClick={onClose} className="flex items-center gap-4 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-xl transition-colors">
                                <Users className="w-5 h-5" />
                                {t('sidebar.newClient')}
                            </Link>
                        </>
                    )}

                    {/* --- CLIENT LINKS --- */}
                    {isClient && (
                        <>
                            <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('sidebar.myAccount')}</div>
                            <Link to="/client/tableau-bord" onClick={onClose} className="flex items-center gap-4 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-xl transition-colors text-brand-gold">
                                <LayoutDashboard className="w-5 h-5" />
                                {t('sidebar.myDashboard')}
                            </Link>
                            <Link to="/client/virement" onClick={onClose} className="flex items-center gap-4 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-xl transition-colors">
                                <CreditCard className="w-5 h-5" />
                                {t('sidebar.makeTransfer')}
                            </Link>
                        </>
                    )}

                    {/* --- PUBLIC LINKS (Only shown when NOT logged in) --- */}
                    {isPublic && (
                        <>
                            <a href="/connexion" className="flex items-center gap-4 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-xl transition-colors group">
                                <UserPlus className="w-5 h-5 text-brand-gold group-hover:scale-110 transition-transform" />
                                {t('sidebar.becomeClient')}
                            </a>

                            <a href="/#comment-ca-marche" onClick={onClose} className="flex items-center gap-4 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-xl transition-colors group">
                                <HelpCircle className="w-5 h-5 text-brand-gold group-hover:scale-110 transition-transform" />
                                {t('sidebar.howItWorks')}
                            </a>

                            <a href="/#faq" onClick={onClose} className="flex items-center gap-4 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-xl transition-colors group">
                                <MessageSquare className="w-5 h-5 text-brand-gold group-hover:scale-110 transition-transform" />
                                {t('sidebar.faq')}
                            </a>

                            <a href="/#contact" onClick={onClose} className="flex items-center gap-4 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-xl transition-colors group">
                                <Phone className="w-5 h-5 text-brand-gold group-hover:scale-110 transition-transform" />
                                {t('sidebar.contactUs')}
                            </a>
                        </>
                    )}
                </div>

                {/* Footer User Info (Logged In Only) */}
                {!isPublic && (
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-[#001830] border-t border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold">
                                {utilisateur.nomUtilisateur.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-white text-sm font-bold truncate w-40">{utilisateur.nomUtilisateur}</p>
                                <p className="text-slate-400 text-xs uppercase">{utilisateur.role.replace('ROLE_', '')}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer CTA (Public Only) */}
                {isPublic && (
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-[#001830] border-t border-white/10">
                        <a href="/#contact" onClick={onClose} className="block bg-gradient-to-r from-brand-gold to-yellow-500 rounded-xl p-4 text-center relative group transition-transform active:scale-95">
                            <p className="text-brand-900 font-bold mb-1">{t('sidebar.needHelp')}</p>
                            <p className="text-brand-900/80 text-sm">{t('sidebar.advisors')}</p>
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
