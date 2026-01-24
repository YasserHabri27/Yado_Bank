import { useState, useEffect } from 'react';
import api from '../../services/api';
import { CreditCard, ArrowUpRight, ArrowDownLeft, ChevronDown, Activity, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const TableauBordClient = () => {
    const [comptes, setComptes] = useState([]);
    const [compteSelectionne, setCompteSelectionne] = useState(null);
    const [operations, setOperations] = useState([]);
    const [chargement, setChargement] = useState(true);
    const [page, setPage] = useState(0);
    const taille = 5;

    useEffect(() => {
        recupererComptes();
    }, []);

    useEffect(() => {
        if (compteSelectionne) {
            recupererOperations(compteSelectionne.rib, page);
        }
    }, [compteSelectionne, page]);

    const recupererComptes = async () => {
        try {
            const reponse = await api.get('/client/comptes');
            setComptes(reponse.data);
            if (reponse.data.length > 0) {
                setCompteSelectionne(reponse.data[0]);
            }
        } catch (erreur) {
            console.error("Erreur lors de la récupération des comptes", erreur);
        } finally {
            setChargement(false);
        }
    };

    const recupererOperations = async (rib, pageActuelle) => {
        try {
            const reponse = await api.get(`/client/operations/${rib}?page=${pageActuelle}&size=${taille}`);
            setOperations(reponse.data.content);
        } catch (erreur) {
            console.error("Erreur lors de la récupération des opérations", erreur);
        }
    };

    if (chargement) return <div className="text-center py-40 text-brand-gold font-mono animate-pulse">Initialisation de l'interface sécurisée...</div>;

    return (
        <div className="space-y-10 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <span className="text-brand-gold font-bold tracking-wider text-sm uppercase mb-1 block">Espace Client</span>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Mes Comptes</h2>
                    <p className="text-slate-400">Vue d'ensemble de votre patrimoine.</p>
                </div>
                <Link
                    to="/client/virement"
                    className="btn-premium px-8 py-3 flex items-center gap-3 backdrop-blur-md"
                >
                    <Send className="w-4 h-4" />
                    Nouveau Virement
                </Link>
            </div>

            {/* Account Selector & Balance Card */}
            <div className="grid md:grid-cols-3 gap-8">
                {comptes.map((cpt) => (
                    <div
                        key={cpt.rib}
                        onClick={() => setCompteSelectionne(cpt)}
                        className={`cursor-pointer p-8 rounded-3xl transition-all duration-500 relative overflow-hidden group border ${compteSelectionne?.rib === cpt.rib
                            ? 'bg-gradient-to-br from-brand-gold to-yellow-600 text-brand-950 border-brand-gold shadow-2xl shadow-brand-gold/20 scale-[1.02]'
                            : 'bg-white/5 border-white/10 hover:border-brand-gold/30 hover:bg-white/10 text-slate-300'
                            }`}
                    >
                        {compteSelectionne?.rib === cpt.rib && (
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -mr-20 -mt-20 blur-2xl"></div>
                        )}

                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div className={`p-4 rounded-2xl ${compteSelectionne?.rib === cpt.rib ? 'bg-black/10 text-brand-950' : 'bg-white/5 text-slate-400'}`}>
                                <CreditCard className="w-8 h-8" />
                            </div>
                            <span className={`text-xs font-bold tracking-widest uppercase py-1.5 px-3 rounded-full ${compteSelectionne?.rib === cpt.rib ? 'bg-black/10 text-brand-950' : 'bg-white/5 text-slate-500'
                                }`}>
                                {cpt.statut}
                            </span>
                        </div>

                        <div className="relative z-10">
                            <p className={`text-sm mb-1 font-medium ${compteSelectionne?.rib === cpt.rib ? 'text-brand-950/70' : 'text-slate-500'}`}>Solde Actuel</p>
                            <h3 className="text-3xl font-bold tracking-tight mb-4">
                                {cpt.solde.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} <span className="text-lg">DH</span>
                            </h3>
                            <div className="font-mono text-xs opacity-70 tracking-widest break-all">
                                {cpt.rib}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Operations List */}
            <div className="glass-panel overflow-hidden">
                <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 className="font-bold text-xl text-white flex items-center gap-3">
                        <Activity className="w-5 h-5 text-brand-gold" />
                        Historique des Opérations
                    </h3>
                    {compteSelectionne && (
                        <span className="text-xs font-mono text-brand-gold bg-brand-gold/10 px-4 py-1.5 rounded-full border border-brand-gold/20">
                            {compteSelectionne.rib}
                        </span>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5 text-slate-400 text-xs uppercase font-bold tracking-wider">
                            <tr>
                                <th className="px-8 py-5 text-left">Type</th>
                                <th className="px-8 py-5 text-left">Description</th>
                                <th className="px-8 py-5 text-left">Date</th>
                                <th className="px-8 py-5 text-right">Montant</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {operations.length > 0 ? (
                                operations.map((op) => (
                                    <tr key={op.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-8 py-5">
                                            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border ${op.type === 'CREDIT' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-slate-700/30 text-slate-400 border-slate-600/30'
                                                }`}>
                                                {op.type === 'CREDIT' ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                                                {op.type}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-sm text-slate-300 font-medium group-hover:text-white transition-colors">{op.description}</td>
                                        <td className="px-8 py-5 text-sm text-slate-500">
                                            {new Date(op.dateOperation).toLocaleDateString()}
                                        </td>
                                        <td className={`px-8 py-5 text-sm font-bold text-right ${op.type === 'CREDIT' ? 'text-green-400' : 'text-white'
                                            }`}>
                                            {op.type === 'DEBIT' ? '-' : '+'}
                                            {op.montant.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} DH
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-8 py-16 text-center text-slate-500">
                                        Aucune opération trouvée pour ce compte.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="p-6 border-t border-white/10 flex justify-between items-center bg-white/5">
                    <button
                        disabled={page === 0}
                        onClick={() => setPage(p => Math.max(0, p - 1))}
                        className="px-6 py-2 text-sm font-bold text-slate-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white hover:border-brand-gold/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        Précédent
                    </button>
                    <span className="text-sm font-mono text-brand-gold/70">Page {page + 1}</span>
                    <button
                        disabled={operations.length < taille}
                        onClick={() => setPage(p => p + 1)}
                        className="px-6 py-2 text-sm font-bold text-slate-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white hover:border-brand-gold/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TableauBordClient;
