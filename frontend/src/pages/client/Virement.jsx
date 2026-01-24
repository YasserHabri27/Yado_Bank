import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Send, CreditCard, FileText, DollarSign, Loader2 } from 'lucide-react';

const Virement = () => {
    const navigate = useNavigate();
    const [comptes, setComptes] = useState([]);
    const [chargement, setChargement] = useState(false);
    const [donneesFormulaire, setDonneesFormulaire] = useState({
        ribSource: '',
        ribDestination: '',
        montant: '',
        description: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        recupererComptes();
    }, []);

    const recupererComptes = async () => {
        try {
            const reponse = await api.get('/client/comptes');
            setComptes(reponse.data);
            if (reponse.data.length > 0) {
                setDonneesFormulaire(precedent => ({ ...precedent, ribSource: reponse.data[0].rib }));
            }
        } catch (erreur) {
            console.error("Erreur lors de la récupération des comptes", erreur);
        }
    };

    const gererChangement = (e) => {
        setDonneesFormulaire({ ...donneesFormulaire, [e.target.name]: e.target.value });
    };

    const soumettreFormulaire = async (e) => {
        e.preventDefault();
        setChargement(true);
        setMessage({ type: '', text: '' });

        if (donneesFormulaire.montant <= 0) {
            setMessage({ type: 'error', text: 'Le montant doit être positif.' });
            setChargement(false);
            return;
        }

        try {
            await api.post('/client/virement', donneesFormulaire);
            setMessage({ type: 'success', text: 'Virement effectué avec succès !' });
            setTimeout(() => navigate('/client/tableau-bord'), 2000);
        } catch (error) {
            const errorMsg = error.response?.data || "Une erreur est survenue";
            setMessage({ type: 'error', text: typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg) });
        } finally {
            setChargement(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto animate-fade-in">
            <Link to="/client/tableau-bord" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors font-medium group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Retour au tableau de bord
            </Link>

            <div className="glass-panel overflow-hidden border-t-2 border-t-brand-gold">
                <div className="p-8 border-b border-white/10 bg-gradient-to-r from-brand-gold/10 to-transparent">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <div className="p-3 bg-brand-gold rounded-xl text-brand-950 shadow-lg shadow-brand-gold/20">
                            <Send className="w-6 h-6" />
                        </div>
                        Effectuer un virement
                    </h2>
                    <p className="text-slate-400 text-sm mt-2 ml-[3.25rem]">Transfert sécurisé instantané entre comptes.</p>
                </div>

                <div className="p-10">
                    {message.text && (
                        <div className={`p-4 rounded-xl mb-8 flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                            {message.type === 'success' ? <div className="w-2 h-2 rounded-full bg-green-500"></div> : <div className="w-2 h-2 rounded-full bg-red-500"></div>}
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={soumettreFormulaire} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">Compte Source</label>
                                <div className="relative group">
                                    <CreditCard className="w-5 h-5 text-slate-500 absolute left-4 top-3.5 group-focus-within:text-brand-gold transition-colors" />
                                    <select
                                        name="ribSource"
                                        className="input-premium pl-12 appearance-none cursor-pointer"
                                        value={donneesFormulaire.ribSource}
                                        onChange={gererChangement}
                                        required
                                    >
                                        {comptes.map(cpt => (
                                            <option key={cpt.rib} value={cpt.rib} className="bg-brand-900 text-white">
                                                {cpt.rib.substring(0, 4)}...{cpt.rib.substring(20)} ({cpt.solde.toLocaleString('fr-FR')} DH)
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">Montant (DH)</label>
                                <div className="relative group">
                                    <DollarSign className="w-5 h-5 text-slate-500 absolute left-4 top-3.5 group-focus-within:text-brand-gold transition-colors" />
                                    <input
                                        type="number"
                                        name="montant"
                                        className="input-premium pl-12 font-mono text-lg"
                                        placeholder="0.00"
                                        value={donneesFormulaire.montant}
                                        onChange={gererChangement}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">RIB Destinataire</label>
                            <div className="relative group">
                                <CreditCard className="w-5 h-5 text-slate-500 absolute left-4 top-3.5 group-focus-within:text-brand-gold transition-colors" />
                                <input
                                    type="text"
                                    name="ribDestination"
                                    className="input-premium pl-12 font-mono tracking-wider"
                                    placeholder="XXXXXXXXXXXXXXXXXXXXXXXX"
                                    value={donneesFormulaire.ribDestination}
                                    onChange={gererChangement}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">Motif (Description)</label>
                            <div className="relative group">
                                <FileText className="w-5 h-5 text-slate-500 absolute left-4 top-3.5 group-focus-within:text-brand-gold transition-colors" />
                                <input
                                    type="text"
                                    name="description"
                                    className="input-premium pl-12"
                                    placeholder="Ex: Loyer, Cadeau..."
                                    value={donneesFormulaire.description}
                                    onChange={gererChangement}
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={chargement}
                                className="w-full btn-premium py-4 flex items-center justify-center gap-2 group text-lg"
                            >
                                {chargement ? <Loader2 className="w-6 h-6 animate-spin" /> : "Confirmer le virement sécurisé"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Virement;
