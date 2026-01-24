import { Link } from 'react-router-dom';
import { UserPlus, PlusCircle, Users, CreditCard } from 'lucide-react';

const TableauBordAgent = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <span className="text-brand-gold font-bold tracking-wider text-sm uppercase mb-1 block">Espace Professionnel</span>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Tableau de bord Agent</h2>
                    <p className="text-slate-400">Gérez vos clients et opérations avec précision.</p>
                </div>
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm text-brand-gold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Système Sécurisé Actif
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <Link to="/agent/ajouter-client" className="group">
                    <div className="glass-panel p-10 glass-panel-hover relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
                        <div className="relative z-10 flex items-start justify-between">
                            <div>
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-lg shadow-blue-500/10">
                                    <UserPlus className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Nouveau Client</h3>
                                <p className="text-slate-400 leading-relaxed max-w-sm">Enregistrement complet d'un nouveau client incluant vérification d'identité (CIN) et coordonnées.</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-blue-500 group-hover:text-white transition-all border border-white/10">
                                <PlusCircle className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </Link>

                <Link to="/agent/ajouter-compte" className="group">
                    <div className="glass-panel p-10 glass-panel-hover relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
                        <div className="relative z-10 flex items-start justify-between">
                            <div>
                                <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-green-600/20 text-green-400 border border-green-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:text-white transition-all shadow-lg shadow-green-500/10">
                                    <CreditCard className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Nouveau Compte</h3>
                                <p className="text-slate-400 leading-relaxed max-w-sm">Ouverture immédiate d'un compte bancaire pour un client existant avec attribution de RIB.</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-green-500 group-hover:text-white transition-all border border-white/10">
                                <PlusCircle className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="glass-panel p-8 mt-8 border-t-2 border-t-brand-gold/20">
                <div className="flex items-center gap-4 text-slate-400">
                    <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-gold w-3/4 animate-pulse"></div>
                    </div>
                    <span className="text-sm">Activités récentes en cours de chargement...</span>
                </div>
            </div>
        </div>
    );
};

export default TableauBordAgent;
