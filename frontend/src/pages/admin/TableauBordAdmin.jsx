import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Users, Plus, Trash2, Shield, Lock, Key, CheckCircle, RefreshCw, BarChart3, TrendingUp, Activity, Search, Edit2, FileText, AlertCircle } from 'lucide-react';
import { useLangue } from '../../contexte/ContexteLangue';

const TableauBordAdmin = () => {
    const { t } = useLangue();
    const [agents, setAgents] = useState([]);
    const [filteredAgents, setFilteredAgents] = useState([]);
    const [stats, setStats] = useState({ nombreAgentsActifs: 0, volumeTransactions: 0, santeSysteme: 'Chargement...' });
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    // Modals
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    // Form Data
    const [currentAgent, setCurrentAgent] = useState({ nomUtilisateur: '', motDePasse: '' }); // For Create
    const [editingAgent, setEditingAgent] = useState({ id: null, nomUtilisateur: '', motDePasse: '' }); // For Edit

    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchAgents();
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get('/admin/statistiques');
            setStats(res.data);
        } catch (error) {
            console.error("Erreur stats:", error);
            setStats({ nombreAgentsActifs: 0, volumeTransactions: 0, santeSysteme: 'Erreur' });
        }
    };

    useEffect(() => {
        setFilteredAgents(
            agents.filter(a => a.nomUtilisateur.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [searchTerm, agents]);

    const fetchAgents = async () => {
        try {
            const res = await api.get('/admin/agents');
            setAgents(res.data);
        } catch (error) {
            console.error("Erreur chargement agents:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAgent = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            const res = await api.post('/admin/agents', currentAgent);
            setAgents([...agents, res.data]);
            setShowCreateModal(false);
            setCurrentAgent({ nomUtilisateur: '', motDePasse: '' });
        } catch (error) {
            alert("Erreur création : " + (error.response?.data || error.message));
        } finally {
            setActionLoading(false);
        }
    };

    const handleEditAgent = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            await api.put(`/admin/agents/${editingAgent.id}`, {
                nomUtilisateur: editingAgent.nomUtilisateur,
                motDePasse: editingAgent.motDePasse
            });
            // Update local state
            setAgents(agents.map(a => a.id === editingAgent.id ? { ...a, nomUtilisateur: editingAgent.nomUtilisateur } : a));
            setShowEditModal(false);
        } catch (error) {
            alert("Erreur modification : " + (error.response?.data || error.message));
        } finally {
            setActionLoading(false);
        }
    };

    const openEditModal = (agent) => {
        setEditingAgent({ id: agent.id, nomUtilisateur: agent.nomUtilisateur, motDePasse: '' }); // Don't show old password
        setShowEditModal(true);
    };

    const handleDeleteAgent = async (id) => {
        if (!window.confirm("Supprimer cet agent ?")) return;
        try {
            await api.delete(`/admin/agents/${id}`);
            setAgents(agents.filter(a => a.id !== id));
        } catch (error) {
            alert("Erreur suppression : " + error.message);
        }
    };

    // Calculate mock stats removed
    // using real 'stats' state instead

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-3xl relative overflow-hidden shadow-2xl border border-white/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full -mr-16 -mt-32 blur-3xl"></div>
                <div className="relative z-10 flex justify-between items-end">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest rounded-full mb-3 border border-red-500/20">
                            <Shield className="w-3 h-3" />
                            {t('admin.badge')}
                        </div>
                        <h2 className="text-4xl font-bold text-white tracking-tight">{t('admin.title')}</h2>
                        <p className="text-slate-400 mt-2">{t('admin.subtitle')}</p>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/[0.07] transition-colors">
                    <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium uppercase">{t('admin.activeAgents')}</p>
                        <p className="text-2xl font-bold text-white">{stats.nombreAgentsActifs}</p>
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/[0.07] transition-colors">
                    <div className="p-3 bg-green-500/20 text-green-400 rounded-xl">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium uppercase">{t('admin.volume')}</p>
                        <p className="text-2xl font-bold text-white">{stats.volumeTransactions.toLocaleString()} <span className="text-xs text-slate-500">Ops</span></p>
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/[0.07] transition-colors">
                    <div className="p-3 bg-brand-gold/20 text-brand-gold rounded-xl">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium uppercase">{t('admin.health')}</p>
                        <p className="text-2xl font-bold text-white">{stats.santeSysteme}</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content: Agent Management */}
                <div className="lg:col-span-3 glass-panel min-h-[500px] p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                            <Users className="w-5 h-5 text-brand-gold" />
                            {t('admin.staffList')} ({agents.length})
                        </h3>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <div className="relative group flex-grow sm:flex-grow-0">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-gold transition-colors" />
                                <input
                                    type="text"
                                    placeholder={t('common.search')}
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full sm:w-48 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:border-brand-gold/50 focus:bg-white/10 focus:outline-none transition-all"
                                />
                            </div>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="bg-brand-gold hover:bg-yellow-500 text-brand-950 font-bold py-2.5 px-4 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-brand-gold/20 whitespace-nowrap"
                            >
                                <Plus className="w-4 h-4" />
                                <span className="hidden sm:inline">{t('admin.addAgent')}</span>
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <RefreshCw className="w-8 h-8 animate-spin text-slate-500" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredAgents.map(agent => (
                                <div key={agent.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-brand-gold/30 transition-all group flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-300 font-bold shrink-0">
                                            {agent.nomUtilisateur.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold">{agent.nomUtilisateur}</h4>
                                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                                <span className="bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3" /> {t('common.active')}
                                                </span>
                                                <span>• {t('common.id')}: {agent.id}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openEditModal(agent)}
                                            className="p-2 bg-white/5 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 rounded-lg transition-colors"
                                            title="Modifier"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteAgent(agent.id)}
                                            className="p-2 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                                            title="Révoquer"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {filteredAgents.length === 0 && (
                                <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                                    <p className="text-slate-500">{t('admin.noAgents')}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Sidebar: System Logs (Mocked) */}
                <div className="bg-[#0f172a]/50 border border-white/10 rounded-3xl p-6 h-fit">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-slate-400" />
                        Activités Récentes
                    </h3>
                    <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                        {[
                            { time: 'À l\'instant', msg: 'Connexion Admin détectée', type: 'info' },
                            { time: 'Il y a 2 min', msg: 'Agent #4 a créé un compte client', type: 'success' },
                            { time: 'Il y a 15 min', msg: 'Nouveau virement > 10,000 MAD', type: 'warning' },
                            { time: 'Il y a 1h', msg: 'Backup système effectué', type: 'info' },
                            { time: 'Il y a 3h', msg: 'Tentative connexion échouée (IP inconnu)', type: 'error' }
                        ].map((log, i) => (
                            <div key={i} className="relative pl-10">
                                <div className={`absolute left-0 top-1 w-10 h-10 rounded-full border-4 border-[#0f172a] flex items-center justify-center ${log.type === 'info' ? 'bg-blue-500' :
                                    log.type === 'success' ? 'bg-green-500' :
                                        log.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}>
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <p className="text-sm text-slate-300 font-medium">{log.msg}</p>
                                <p className="text-xs text-slate-600 mt-1 font-mono">{log.time}</p>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl text-sm font-bold transition-colors">
                        Voir tout l'historique
                    </button>
                </div>
            </div>

            {/* CREATE MODAL */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-[#0f172a] border border-white/10 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden animate-slide-up">
                        <div className="p-6 border-b border-white/10 bg-white/5">
                            <h3 className="text-xl font-bold text-white">{t('admin.addAgent')}</h3>
                        </div>
                        <form onSubmit={handleCreateAgent} className="p-6 space-y-4">
                            {/* Same form as before */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase">{t('common.email')}</label>
                                <input type="text" value={currentAgent.nomUtilisateur} onChange={e => setCurrentAgent({ ...currentAgent, nomUtilisateur: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase">{t('common.password')}</label>
                                <input type="text" value={currentAgent.motDePasse} onChange={e => setCurrentAgent({ ...currentAgent, motDePasse: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none" required />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-colors">{t('common.cancel')}</button>
                                <button type="submit" disabled={actionLoading} className="flex-1 py-3 bg-brand-gold hover:bg-yellow-500 text-brand-950 rounded-xl font-bold transition-colors">{actionLoading ? "..." : t('common.submit')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-[#0f172a] border border-white/10 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden animate-slide-up">
                        <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">{t('common.edit')}</h3>
                            <div className="px-2 py-1 bg-brand-gold/20 text-brand-gold text-xs rounded font-mono">ID: {editingAgent.id}</div>
                        </div>
                        <form onSubmit={handleEditAgent} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase">Identifiant</label>
                                <input
                                    type="text"
                                    value={editingAgent.nomUtilisateur}
                                    onChange={e => setEditingAgent({ ...editingAgent, nomUtilisateur: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase">Nouveau Mot de Passe (Optionnel)</label>
                                <div className="relative">
                                    <Key className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        value={editingAgent.motDePasse}
                                        onChange={e => setEditingAgent({ ...editingAgent, motDePasse: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none font-mono"
                                        placeholder="Laisser vide pour ne pas changer"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-colors">
                                    Annuler
                                </button>
                                <button type="submit" disabled={actionLoading} className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors">
                                    {actionLoading ? "..." : t('common.save')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableauBordAdmin;
