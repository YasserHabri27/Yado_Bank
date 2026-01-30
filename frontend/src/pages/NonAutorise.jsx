import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export default function NonAutorise() {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border-t-4 border-red-500">
                <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldAlert className="w-10 h-10 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Accès Interdit</h1>
                <p className="text-gray-600 mb-6">
                    Vous n'avez pas le droit d'accéder à cette fonctionnalité. Veuillez contacter votre administrateur.
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Retour
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-brand-900 text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                        Accueil
                    </button>
                </div>
            </div>
        </div>
    );
}
