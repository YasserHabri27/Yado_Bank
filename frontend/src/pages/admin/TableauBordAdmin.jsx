import { useState, useEffect } from ;
import api from ;
import { Users, Plus, Trash2, Shield, Lock, Key, CheckCircle, RefreshCw, BarChart3, TrendingUp, Activity, Search, Edit2, FileText, AlertCircle } from ;
import { useLangue } from ;

const TableauBordAdmin = () => {
    const { t } = useLangue();
    const [agents, setAgents] = useState([]);
    const [filteredAgents, setFilteredAgents] = useState([]);
    const [stats, setStats] = useState({ nombreAgentsActifs: 0, volumeTransactions: 0, santeSysteme:  });
    const [searchTerm, setSearchTerm] = useState();
    const [loading, setLoading] = useState(true);

    
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    
    const [currentAgent, setCurrentAgent] = useState({ nomUtilisateur: , motDePasse:  }); 
    const [editingAgent, setEditingAgent] = useState({ id: null, nomUtilisateur: , motDePasse:  }); 

    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchAgents();
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get();
            setStats(res.data);
        } catch (error) {
            console.error("Erreur stats:", error);
            setStats({ nombreAgentsActifs: 0, volumeTransactions: 0, santeSysteme:  });
        }
    };

    useEffect(() => {
        setFilteredAgents(
            agents.filter(a => a.nomUtilisateur.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [searchTerm, agents]);

    const fetchAgents = async () => {
        try {
            const res = await api.get();
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
            const res = await api.post(, currentAgent);
            setAgents([...agents, res.data]);
            setShowCreateModal(false);
            setCurrentAgent({ nomUtilisateur: , motDePasse:  });
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
            
            setAgents(agents.map(a => a.id === editingAgent.id ? { ...a, nomUtilisateur: editingAgent.nomUtilisateur } : a));
            setShowEditModal(false);
        } catch (error) {
            alert("Erreur modification : " + (error.response?.data || error.message));
        } finally {
            setActionLoading(false);
        }
    };

    const openEditModal = (agent) => {
        setEditingAgent({ id: agent.id, nomUtilisateur: agent.nomUtilisateur, motDePasse:  }); 
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

    
    

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            {}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-3xl relative overflow-hidden shadow-2xl border border-white/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full -mr-16 -mt-32 blur-3xl"></div>
                <div className="relative z-10 flex justify-between items-end">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest rounded-full mb-3 border border-red-500/20">
                            <Shield className="w-3 h-3" />
                            {t()}
                        </div>
                        <h2 className="text-4xl font-bold text-white tracking-tight">{t()}</h2>
                        <p className="text-slate-400 mt-2">{t()}</p>
                    </div>
                </div>
            </div>

            {}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/[0.07] transition-colors">
                    <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium uppercase">{t()}</p>
                        <p className="text-2xl font-bold text-white">{stats.nombreAgentsActifs}</p>
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/[0.07] transition-colors">
                    <div className="p-3 bg-green-500/20 text-green-400 rounded-xl">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium uppercase">{t()}</p>
                        <p className="text-2xl font-bold text-white">{stats.volumeTransactions.toLocaleString()} <span className="text-xs text-slate-500">Ops</span></p>
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/[0.07] transition-colors">
                    <div className="p-3 bg-brand-gold/20 text-brand-gold rounded-xl">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium uppercase">{t()}</p>
                        <p className="text-2xl font-bold text-white">{stats.santeSysteme}</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {}
                <div className="lg:col-span-3 glass-panel min-h-[500px] p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                            <Users className="w-5 h-5 text-brand-gold" />
                            {t()} ({agents.length})
                        </h3>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <div className="relative group flex-grow sm:flex-grow-0">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-gold transition-colors" />
                                <input
                                    type="text"
                                    placeholder={t()}
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
                                <span className="hidden sm:inline">{t()}</span>
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
                                                    <CheckCircle className="w-3 h-3" /> {t()}
                                                </span>
                                                <span>• {t()}: {agent.id}</span>
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
                                    <p className="text-slate-500">{t()}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {}
                <div className="bg-[#0f172a]/50 border border-white/10 rounded-3xl p-6 h-fit">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-slate-400" />
                        Activités Récentes
                    </h3>
                    <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                        {[
                            { time: , msg: , type:  },
                            { time: , msg: , type:  },
                            { time: , msg: , type:  },
                            { time: , msg: , type:  },
                            { time: , msg: , type:  }
                        ].map((log, i) => (
                            <div key={i} className="relative pl-10">
                                <div className={`absolute left-0 top-1 w-10 h-10 rounded-full border-4 border-[#0f172a] flex items-center justify-center ${log.type ===  ?  :
                                    log.type ===  ?  :
                                        log.type ===  ?  : 
                                    }`}>
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <p className="text-sm text-slate-300 font-medium">{log.msg}</p>
                                <p className="text-xs text-slate-600 mt-1 font-mono">{log.time}</p>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl text-sm font-bold transition-colors">
                        Voir tout ladmin.addAgentcommon.emailcommon.passwordcommon.cancelcommon.submitcommon.editcommon.save')}
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
