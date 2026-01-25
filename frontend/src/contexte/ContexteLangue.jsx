import { createContext, useContext, useState, useEffect } from 'react';
import { traductions } from './traductions';

const ContexteLangue = createContext(null);

export const LangueProvider = ({ children }) => {
    const [langue, setLangue] = useState(localStorage.getItem('langue') || 'fr');

    useEffect(() => {
        localStorage.setItem('langue', langue);
        if (langue === 'ar') {
            document.documentElement.dir = 'rtl';
            document.documentElement.lang = 'ar';
        } else {
            document.documentElement.dir = 'ltr';
            document.documentElement.lang = langue;
        }
    }, [langue]);

    // Helper to get nested translation
    const t = (path) => {
        const keys = path.split('.');
        let current = traductions[langue];
        for (const key of keys) {
            if (current[key] === undefined) return path;
            current = current[key];
        }
        return current;
    };

    return (
        <ContexteLangue.Provider value={{ langue, setLangue, t }}>
            {children}
        </ContexteLangue.Provider>
    );
};

export const useLangue = () => useContext(ContexteLangue);
