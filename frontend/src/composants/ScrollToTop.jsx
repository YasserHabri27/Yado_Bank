import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Check both window and document element for wider compatibility
            const scrolled = window.scrollY || document.documentElement.scrollTop;
            if (scrolled > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Retour en haut"
            className={`fixed bottom-8 right-8 p-4 rounded-full z-[9999] transition-all duration-500 transform shadow-xl shadow-brand-gold/30 flex items-center justify-center group cursor-pointer
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}
                bg-gradient-to-tr from-brand-gold to-brand-gold-light border border-white/20
                hover:scale-110 hover:shadow-2xl hover:shadow-brand-gold/50 hover:-translate-y-1
                text-brand-900 animate-bounce`}
        >
            <div className="absolute inset-0 bg-white/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <ArrowUp className="w-6 h-6 font-bold" />
        </button>
    );
};

export default ScrollToTop;
