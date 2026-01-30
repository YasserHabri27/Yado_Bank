import { useState } from ;
import { useNavigate, useLocation, Outlet } from ;
import { useAuth } from ;
import Navbar from ;
import Sidebar from ;
import Chatbot from ;

const MiseEnPage = () => {
    const { utilisateur } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    
    const publicRoutes = [, , , , , , ];

    if (!utilisateur && !publicRoutes.includes(location.pathname)) {
        
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
