import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [utilisateur, setUtilisateur] = useState(null);
    const [chargement, setChargement] = useState(true);

    useEffect(() => {
        const utilisateurStocke = localStorage.getItem('utilisateur');
        if (utilisateurStocke) {
            setUtilisateur(JSON.parse(utilisateurStocke));
        }
        setChargement(false);
    }, []);

    const connexion = async (nomUtilisateur, motDePasse) => {
        try {
            const reponse = await api.post('/auth/connexion', { nomUtilisateur, motDePasse });
            if (reponse.data.token) {
                localStorage.setItem('utilisateur', JSON.stringify(reponse.data));
                setUtilisateur(reponse.data);
                return true;
            }
        } catch (erreur) {
            throw erreur;
        }
    };

    const deconnexion = () => {
        localStorage.removeItem('utilisateur');
        setUtilisateur(null);
    };

    return (
        <AuthContext.Provider value={{ utilisateur, connexion, deconnexion, chargement }}>
            {!chargement && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
