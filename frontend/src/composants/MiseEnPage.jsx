import { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../contexte/ContexteAuth';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Chatbot from './Chatbot';

const MiseEnPage = () => {
    const { utilisateur } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Updated public routes list
    const publicRoutes = ['/', '/connexion', '/services', '/apropos', '/contact', '/contacter-conseiller', '/mot-de-passe-oublie'];

    if (!utilisateur && !publicRoutes.includes(location.pathname)) {
        // Should be handled by ProtectedRoute but extra safety
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-transparent transition-colors duration-300 flex flex-col">
            <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <Chatbot />

            <main className="flex-grow container mx-auto px-6 py-8">
                <Outlet />
            </main>

            <footer className="bg-white dark:bg-brand-900 border-t border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 py-6 text-center text-sm transition-colors duration-300">
                <p>&copy; 2026 Yasser Habri & Doha Allali Bank. Tous droits réservés.</p>
            </footer>
        </div>
    );
};

export default MiseEnPage;
