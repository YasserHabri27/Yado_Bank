import { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, User, CreditCard, Mail, Calendar, MapPin, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AjouterClient = () => {
    const navigate = useNavigate();
    const [chargement, setChargement] = useState(false);
    const [donneesFormulaire, setDonneesFormulaire] = useState({
        numeroIdentite: '',
        prenom: '',
        nom: '',
        email: '',
        dateNaissance: '',
        adressePostale: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    const gererChangement = (e) => {
        setDonneesFormulaire({ ...donneesFormulaire, [e.target.name]: e.target.value });
    };

    const soumettreFormulaire = async (e) => {
        e.preventDefault();
        setChargement(true);
        setMessage({ type: '', text: '' });

        try {
            await api.post('/agent/clients', donneesFormulaire);
            setMessage({ type: 'success', text: 'Client créé avec succès ! Identifiants envoyés par email.' });
            setTimeout(() => navigate('/agent/tableau-bord'), 2000);
        } catch (error) {
            const errorMsg = error.response?.data || "Une erreur est survenue";
            setMessage({ type: 'error', text: typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg) });
        } finally {
            setChargement(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/agent/tableau-bord" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <span className="text-brand-gold font-bold tracking-wider text-xs uppercase mb-1 block">Nouveau Dossier</span>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Enregistrement Client</h2>
                </div>
            </div>

            <div className="glass-panel overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

                <div className="p-10 relative z-10">
                    {message.text && (
                        <div className={`p-4 rounded-xl mb-8 flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                            {message.type === 'success' ? <div className="w-2 h-2 rounded-full bg-green-500"></div> : <div className="w-2 h-2 rounded-full bg-red-500"></div>}
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={soumettreFormulaire} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">Numéro d'identité (CIN)</label>
                                <div className="relative group">
                                    <CreditCard className="w-5 h-5 text-slate-500 absolute left-4 top-3.5 group-focus-within:text-brand-gold transition-colors" />
                                    <input
                                        type="text"
                                        name="numeroIdentite"
                                        className="input-premium pl-12"
                                        placeholder="ex: AB123456"
                                        value={donneesFormulaire.numeroIdentite}
                                        onChange={gererChangement}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">Adresse Email</label>
                                <div className="relative group">
                                    <Mail className="w-5 h-5 text-slate-500 absolute left-4 top-3.5 group-focus-within:text-brand-gold transition-colors" />
                                    <input
                                        type="email"
                                        name="email"
                                        className="input-premium pl-12"
                                        placeholder="client@exemple.com"
                                        value={donneesFormulaire.email}
                                        onChange={gererChangement}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">Prénom</label>
                                <input
                                    type="text"
                                    name="prenom"
                                    className="input-premium px-4"
                                    placeholder="Prénom"
                                    value={donneesFormulaire.prenom}
                                    onChange={gererChangement}
                                    required
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">Nom</label>
                                <input
                                    type="text"
                                    name="nom"
                                    className="input-premium px-4"
                                    placeholder="Nom"
                                    value={donneesFormulaire.nom}
                                    onChange={gererChangement}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">Date de naissance</label>
                                <div className="relative group">
                                    <Calendar className="w-5 h-5 text-slate-500 absolute left-4 top-3.5 group-focus-within:text-brand-gold transition-colors" />
                                    <input
                                        type="date"
                                        name="dateNaissance"
                                        className="input-premium pl-12"
                                        value={donneesFormulaire.dateNaissance}
                                        onChange={gererChangement}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">Adresse Postale</label>
                                <div className="relative group">
                                    <MapPin className="w-5 h-5 text-slate-500 absolute left-4 top-3.5 group-focus-within:text-brand-gold transition-colors" />
                                    <input
                                        type="text"
                                        name="adressePostale"
                                        className="input-premium pl-12"
                                        placeholder="Adresse complète"
                                        value={donneesFormulaire.adressePostale}
                                        onChange={gererChangement}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={chargement}
                                className="btn-premium px-10 py-4 flex items-center gap-2 group"
                            >
                                {chargement ? <Loader2 className="w-5 h-5 animate-spin" /> : "Créer le client"}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AjouterClient;
