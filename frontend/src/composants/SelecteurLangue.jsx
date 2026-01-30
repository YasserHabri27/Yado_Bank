import { useState, useRef, useEffect } from ;
import { Globe, ChevronDown } from ;
import { useLangue } from ;

const SelecteurLangue = () => {
    const { langue, setLangue } = useLangue();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const langues = [
        { code: , label: , flag:  },
        { code: , label: , flag:  },
        { code: , label: , flag:  },
        { code: , label: , flag:  }
    ];

    const currentLang = langues.find(l => l.code === langue) || langues[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener(, handleClickOutside);
        return () => document.removeEventListener(, handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                title="Changer la langue"
            >
                <Globe className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                <span className="text-sm font-bold text-slate-700 dark:text-white hidden sm:inline-block">
                    {currentLang.code.toUpperCase()}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ?  : }`} />
            </button>

            {isOpen && (
                <div className={`absolute top-full mt-2 w-40 bg-white dark:bg-brand-900 rounded-xl shadow-xl border border-slate-100 dark:border-white/10 overflow-hidden animate-fade-in z-50 ${langue ===  ?  : }`}>
                    {langues.map((l) => (
                        <button
                            key={l.code}
                            onClick={() => {
                                setLangue(l.code);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${langue === l.code
                                    ? 
                                    : 
                                }`}
                        >
                            <span className="text-lg">{l.flag}</span>
                            {l.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelecteurLangue;
