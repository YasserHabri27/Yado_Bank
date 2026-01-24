import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';

export default function NonTrouve() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <div className="text-center">
                <FileQuestion className="w-24 h-24 text-brand-gold mx-auto mb-6 opacity-80" />
                <h1 className="text-4xl font-bold text-brand-900 mb-2">404</h1>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Page Introuvable</h2>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                    La page que vous recherchez n'existe pas ou a été déplacée.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center justify-center px-8 py-3 bg-brand-gold text-brand-900 font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    );
}
