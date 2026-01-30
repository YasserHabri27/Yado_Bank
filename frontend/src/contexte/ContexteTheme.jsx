import { createContext, useContext, useEffect, useState } from ;

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    
    const [theme, setTheme] = useState(
        localStorage.getItem() || 
    );

    useEffect(() => {
        const root = window.document.documentElement;
        console.log(`[THEME] Applying theme: ${theme}`);
        root.classList.remove(, );
        root.classList.add(theme);
        localStorage.setItem(, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev ===  ?  : ));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
