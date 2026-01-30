import { useState, useEffect } from ;
import api from ;
import { CreditCard, ArrowUpRight, ArrowDownLeft, ChevronDown, Activity, Send } from ;
import { Link } from ;
import { useLangue } from ;

const TableauBordClient = () => {
    const { t } = useLangue();
    const [comptes, setComptes] = useState([]);
    const [compteSelectionne, setCompteSelectionne] = useState(null);
    const [operations, setOperations] = useState([]);
    const [chargement, setChargement] = useState(true);
    const [page, setPage] = useState(0);
    const taille = 5;

    useEffect(() => {
        recupererComptes();
    }, []);

    useEffect(() => {
        if (compteSelectionne) {
            recupererOperations(compteSelectionne.rib, page);
        }
    }, [compteSelectionne, page]);

    const recupererComptes = async () => {
        try {
            const reponse = await api.get();
            setComptes(reponse.data);
            if (reponse.data.length > 0) {
                setCompteSelectionne(reponse.data[0]);
            }
        } catch (erreur) {
            console.error("Erreur lors de la récupération des comptes", erreur);
        } finally {
            setChargement(false);
        }
    };

    const [totalPages, setTotalPages] = useState(0);

    const recupererOperations = async (rib, pageActuelle) => {
        try {
            const reponse = await api.get(`/client/operations/${rib}?page=${pageActuelle}&size=${taille}`);
            setOperations(reponse.data.content);
            setTotalPages(reponse.data.totalPages);
        } catch (erreur) {
            console.error("Erreur lors de la récupération des opérations", erreur);
        }
    };

    if (chargement) return <div className="text-center py-40 text-brand-gold font-mono animate-pulse">Initialisation de lclient.badgeclient.titleclient.subtitleclient.newTransferbg-gradient-to-br from-brand-gold to-yellow-600 text-brand-950 border-brand-gold shadow-2xl shadow-brand-gold/20 scale-[1.02]bg-white/5 border-white/10 hover:border-brand-gold/30 hover:bg-white/10 text-slate-300bg-black/10 text-brand-950bg-white/5 text-slate-400bg-black/10 text-brand-950bg-white/5 text-slate-500text-brand-950/70text-slate-500client.balancefr-FRclient.historycommon.typecommon.descriptioncommon.datecommon.amountCREDITbg-green-500/10 text-green-400 border-green-500/20bg-slate-700/30 text-slate-400 border-slate-600/30CREDITCREDITtext-green-400text-whiteDEBIT-+fr-FRclient.noOpscommon.previouscommon.next')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TableauBordClient;
