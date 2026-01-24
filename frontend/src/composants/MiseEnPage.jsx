import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../contexte/ContexteAuth';
import { LogOut, Building2 } from 'lucide-react';

const MiseEnPage = () => {
    const { utilisateur, deconnexion } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const gererDeconnexion = () => {
        deconnexion();
        navigate('/connexion');
    };

    if (!utilisateur && location.pathname !== '/connexion') {
        // Should be handled by ProtectedRoute but extra safety
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="bg-brand-900 text-white shadow-lg z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Building2 className="w-8 h-8 text-brand-gold" />
                        <h1 className="text-xl font-bold tracking-wide">
                            Yasser Habri & Doha Allali <span className="text-brand-gold">Bank</span>
                        </h1>
                    </div>

                    {utilisateur && (
                        <div className="flex items-center gap-4">
                            <span className="text-slate-300 text-sm hidden md:block">
                                {utilisateur.nomUtilisateur} ({utilisateur.role})
                            </span>
                            <button
                                onClick={() => navigate('/changer-mot-de-passe')}
                                className="text-sm text-slate-300 hover:text-white transition-colors"
                            >
                                Changer mot de passe
                            </button>
                            <button
                                onClick={gererDeconnexion}
                                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-all"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Déconnexion</span>
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <main className="flex-grow container mx-auto px-6 py-8">
                <Outlet />
            </main>

            <footer className="bg-brand-900 text-slate-400 py-6 text-center text-sm">
                <p>&copy; 2026 Yasser Habri & Doha Allali Bank. Tous droits réservés.</p>
            </footer>
        </div>
    );
};

export default MiseEnPage;
