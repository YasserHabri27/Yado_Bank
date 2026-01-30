import { useTheme } from ;
import { Sun, Moon } from ;

const BoutonTheme = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-200
                bg-slate-200 hover:bg-slate-300 text-slate-800
                dark:bg-white/10 dark:hover:bg-white/20 dark:text-brand-gold"
            aria-label="Changer le thème"
        >
            {theme ===  ? (
                <Sun className="w-5 h-5 animate-spin-slow" />
            ) : (
                <Moon className="w-5 h-5 animate-pulse-slow" />
            )}
        </button>
    );
};

export default BoutonTheme;
