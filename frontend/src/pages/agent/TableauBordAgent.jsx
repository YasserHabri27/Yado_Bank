import { useState, useEffect } from ;
import { Link } from ;
import api from ; 
import {
    Users, CreditCard, Search, PlusCircle, Trash2, Edit2,
    CheckCircle, XCircle, AlertTriangle, Filter, ChevronDown,
    MoreHorizontal, Shield, RefreshCw
} from ;
import { useLangue } from ;

const TableauBordAgent = () => {
    const { t } = useLangue();
    
    const [activeTab, setActiveTab] = useState();
    const [clients, setClients] = useState([]);
    const [comptes, setComptes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState();
    const [actionLoading, setActionLoading] = useState(null); 

    
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingClient, setEditingClient] = useState(null);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === ) {
                const res = await api.get();
                setClients(Array.isArray(res.data) ? res.data : []); 
            } else {
                const res = await api.get();
                setComptes(Array.isArray(res.data) ? res.data : []);
            }
        } catch (error) {
            console.error("Erreur chargement données:", error);
        } finally {
            setLoading(false);
        }
    };

    
    const handleDeleteClient = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce client ? Cette action est irréversible.")) return;

        setActionLoading(id);
        try {
            await api.delete(`/agent/clients/${id}`);
            setClients(clients.filter(c => c.id !== id));
        } catch (error) {
            alert("Erreur lors de la suppression : " + (error.response?.data || error.message));
        } finally {
            setActionLoading(null);
        }
    };

    const handleEditClient = (client) => {
        setEditingClient({ ...client });
        setShowEditModal(true);
    };

    const saveClientChanges = async (e) => {
        e.preventDefault();
        setActionLoading();
        try {
            await api.put(`/agent/clients/${editingClient.id}`, editingClient);
            setClients(clients.map(c => c.id === editingClient.id ? editingClient : c));
            setShowEditModal(false);
        } catch (error) {
            alert("Erreur mise à jour : " + (error.response?.data || error.message));
        } finally {
            setActionLoading(null);
        }
    };

    
    const handleDeleteAccount = async (rib) => {
        if (!window.confirm("Supprimer ce compte bancaire ?")) return;

        setActionLoading(rib);
        try {
            await api.delete(`/agent/comptes/${rib}`);
            setComptes(comptes.filter(c => c.rib !== rib));
        } catch (error) {
            alert("Erreur suppression compte : " + error.message);
        } finally {
            setActionLoading(null);
        }
    };

    const handleStatusChange = async (rib, newStatus) => {
        setActionLoading(rib);
        try {
            await api.put(`/agent/comptes/${rib}/statut`, newStatus); 
            setComptes(comptes.map(c => c.rib === rib ? { ...c, statut: newStatus } : c));
        } catch (error) {
            console.error("Status update failed:", error);
            alert("Impossible de changer le statut.");
        } finally {
            setActionLoading(null);
        }
    };

    
    const filteredClients = clients.filter(c =>
        c.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.numeroIdentite?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredAccounts = comptes.filter(c =>
        c.rib?.includes(searchTerm) ||
        c.client?.nom?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            {}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-gradient-to-r from-brand-900 to-brand-800 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-32 blur-3xl"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-widest rounded-full border border-brand-gold/20">
                            {t()}
                        </span>
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">{t()}</h2>
                    <p className="text-slate-300 max-w-lg">{t()}</p>
                </div>

                <div className="flex gap-3 relative z-10 w-full md:w-auto">
                    <Link to="/agent/ajouter-client" className="flex-1 md:flex-none btn-premium py-3 px-6 flex items-center justify-center gap-2 text-sm">
                        <Users className="w-4 h-4" /> {t()}
                    </Link>
                    <Link to="/agent/ajouter-compte" className="flex-1 md:flex-none bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm border border-white/10 backdrop-blur-sm">
                        <CreditCard className="w-4 h-4" /> {t()}
                    </Link>
                </div>
            </div>

            {}
            <div className="glass-panel overflow-hidden min-h-[600px] flex flex-col">
                {}
                <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 bg-white/5">
                    {}
                    <div className="flex p-1 bg-black/20 rounded-xl">
                        <button
                            onClick={() => setActiveTab()}
                            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab ===  ?  : }`}
                        >
                            <Users className="w-4 h-4" /> {t()}
                        </button>
                        <button
                            onClick={() => setActiveTab()}
                            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab ===  ?  : }`}
                        >
                            <CreditCard className="w-4 h-4" /> {t()}
                        </button>
                    </div>

                    {}
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-brand-gold transition-colors" />
                        <input
                            type="text"
                            placeholder={activeTab ===  ? t() : t()}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/10 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold/50 focus:bg-black/20 transition-all"
                        />
                    </div>
                </div>

                {}
                <div className="flex-grow bg-black/10 p-6">
                    {loading ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4">
                            <RefreshCw className="w-10 h-10 animate-spin text-brand-gold" />
                            <p>Chargement des données sécurisées...</p>
                        </div>
                    ) : (
                        <>
                            {}
                            {activeTab ===  && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredClients.map((client) => (
                                        <div key={client.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-brand-gold/30 transition-all group relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                                <button onClick={() => handleEditClient(client)} className="p-2 bg-brand-gold text-brand-950 rounded-lg hover:bg-white transition-colors" title="Modifier">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDeleteClient(client.id)} className="p-2 bg-red-500/80 text-white rounded-lg hover:bg-red-500 transition-colors" title="Supprimer">
                                                    {actionLoading === client.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                                    {client.nom?.charAt(0)}{client.prenom?.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-bold text-lg">{client.nom} {client.prenom}</h3>
                                                    <p className="text-slate-400 text-xs font-mono bg-white/5 px-2 py-0.5 rounded inline-block">{client.numeroIdentite}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-2 text-sm text-slate-400 border-t border-white/5 pt-4">
                                                <div className="flex justify-between">
                                                    <span>Naissance:</span>
                                                    <span className="text-slate-200">{client.dateNaissance}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Email:</span>
                                                    <span className="text-slate-200">{client.utilisateur?.email || "N/A"}</span>
                                                </div>
                                                <div className="block mt-2 text-xs truncate opacity-70">
                                                    {client.adressePostale}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {filteredClients.length === 0 && (
                                        <div className="col-span-full text-center py-20 text-slate-500">
                                            Aucun client trouvé.
                                        </div>
                                    )}
                                </div>
                            )}

                            {}
                            {activeTab ===  && (
                                <div className="space-y-4">
                                    {filteredAccounts.map((compte) => (
                                        <div key={compte.rib} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/[0.07] transition-all">
                                            <div className="flex items-center gap-6 w-full md:w-auto">
                                                <div className="p-4 bg-brand-gold/10 text-brand-gold rounded-xl">
                                                    <CreditCard className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3 className="font-mono text-lg text-white font-bold tracking-wider">{compte.rib}</h3>
                                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${(compte.statut ===  || compte.statut === ) ?  :
                                                            compte.statut ===  ?  :
                                                                
                                                            }`}>
                                                            {compte.statut}
                                                        </span>
                                                    </div>
                                                    <p className="text-slate-400 text-sm">Client: <span className="text-white">{compte.client?.nom} {compte.client?.prenom}</span></p>
                                                </div>
                                            </div>

                                            <div className="text-right w-full md:w-auto">
                                                <p className="text-slate-500 text-xs uppercase font-bold tracking-widest mb-1">Solde Disponible</p>
                                                <p className="text-2xl font-bold text-white">{compte.solde?.toLocaleString()} <span className="text-brand-gold text-sm">MAD</span></p>
                                            </div>

                                            <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 justify-end">
                                                <div className="relative group/status">
                                                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-300 transition-colors">
                                                        <Shield className="w-5 h-5" />
                                                    </button>
                                                    {}
                                                    <div className="absolute bottom-full right-0 mb-2 w-48 bg-[#0a0f1d] border border-white/10 rounded-xl shadow-xl overflow-hidden hidden group-hover/status:block z-50">
                                                        <div className="p-2 space-y-1">
                                                            {[, , , ].map(status => (
                                                                <button
                                                                    key={status}
                                                                    onClick={() => handleStatusChange(compte.rib, status)}
                                                                    className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 ${compte.statut === status ?  : }`}
                                                                >
                                                                    {compte.statut === status && <CheckCircle className="w-3 h-3" />}
                                                                    {status}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => handleDeleteAccount(compte.rib)}
                                                    className="p-2 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-lg transition-colors"
                                                    title="Clôturer le compte"
                                                >
                                                    {actionLoading === compte.rib ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {filteredAccounts.length === 0 && (
                                        <div className="text-center py-20 text-slate-500">
                                            Aucun compte trouvé.
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {}
            {showEditModal && editingClient && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-[#0f172a] border border-white/10 rounded-3xl w-full max-w-lg shadow-2xl relative overflow-hidden">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Edit2 className="w-5 h-5 text-brand-gold" /> Modifier Client
                            </h3>
                            <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-white transition-colors">
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={saveClientChanges} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase">Prénom</label>
                                    <input
                                        type="text"
                                        value={editingClient.prenom}
                                        onChange={e => setEditingClient({ ...editingClient, prenom: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-brand-gold/50 focus:outline-none"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase">Nom</label>
                                    <input
                                        type="text"
                                        value={editingClient.nom}
                                        onChange={e => setEditingClient({ ...editingClient, nom: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-brand-gold/50 focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase">N° Identité (CIN)</label>
                                <input
                                    type="text"
                                    value={editingClient.numeroIdentite}
                                    onChange={e => setEditingClient({ ...editingClient, numeroIdentite: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-brand-gold/50 focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase">Date de Naissance</label>
                                <input
                                    type="date"
                                    value={editingClient.dateNaissance}
                                    onChange={e => setEditingClient({ ...editingClient, dateNaissance: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-brand-gold/50 focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase">Adresse Postale</label>
                                <textarea
                                    value={editingClient.adressePostale}
                                    onChange={e => setEditingClient({ ...editingClient, adressePostale: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-brand-gold/50 focus:outline-none resize-none h-24"
                                    required
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-colors">
                                    Annuler
                                </button>
                                <button type="submit" disabled={actionLoading} className="flex-1 py-3 bg-brand-gold hover:bg-yellow-500 text-brand-950 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                                    {actionLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableauBordAgent;
