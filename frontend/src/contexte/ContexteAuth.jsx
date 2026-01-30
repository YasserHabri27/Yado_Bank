import { createContext, useState, useContext, useEffect } from ;
import api from ;

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [utilisateur, setUtilisateur] = useState(null);
    const [chargement, setChargement] = useState(true);

    useEffect(() => {
        const utilisateurStocke = localStorage.getItem();
        if (utilisateurStocke) {
            setUtilisateur(JSON.parse(utilisateurStocke));
        }
        setChargement(false);
    }, []);

    const connexion = async (nomUtilisateur, motDePasse) => {
        try {
            const reponse = await api.post(, { nomUtilisateur, motDePasse });
            if (reponse.data.token) {
                localStorage.setItem(, JSON.stringify(reponse.data));
                setUtilisateur(reponse.data);
                return reponse.data; 
            }
        } catch (erreur) {
            throw erreur;
        }
    };

    const deconnexion = () => {
        localStorage.removeItem();
        setUtilisateur(null);
    };

    return (
        <AuthContext.Provider value={{ utilisateur, login: connexion, deconnexion, chargement }}>
            {!chargement && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
