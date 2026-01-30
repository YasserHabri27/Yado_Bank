import { createContext, useContext, useState, useEffect } from ;
import { traductions } from ;

const ContexteLangue = createContext(null);

export const LangueProvider = ({ children }) => {
    const [langue, setLangue] = useState(localStorage.getItem() || );

    useEffect(() => {
        localStorage.setItem(, langue);
        if (langue === ) {
            document.documentElement.dir = ;
            document.documentElement.lang = ;
        } else {
            document.documentElement.dir = ;
            document.documentElement.lang = langue;
        }
    }, [langue]);

    
    const t = (path) => {
        const keys = path.split();
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
