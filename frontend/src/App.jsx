
import { Routes, Route } from ;
import Connexion from ;
import MiseEnPage from ;
import RouteProtegee from ;
import ScrollToTop from ;
import TableauBordAgent from ;
import TableauBordAdmin from ;
import TableauBordClient from ;
import AjouterClient from ;
import AjouterCompte from ;
import Virement from ;
import ChangerMotDePasse from ;
import NonAutorise from ;
import NonTrouve from ;
import Accueil from ;
import ContacterConseiller from ;
import MotDePasseOublie from ;


function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MiseEnPage />}>
          {}
          <Route path="/" element={<Accueil />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/contacter-conseiller" element={<ContacterConseiller />} />
          <Route path="/mot-de-passe-oublie" element={<MotDePasseOublie />} />

          {}
          <Route element={<RouteProtegee allowedRoles={[]} />}>
            <Route path="/agent/tableau-bord" element={<TableauBordAgent />} />
            <Route path="/agent/ajouter-client" element={<AjouterClient />} />
            <Route path="/agent/ajouter-compte" element={<AjouterCompte />} />
          </Route>

          {}
          <Route element={<RouteProtegee allowedRoles={[]} />}>
            <Route path="/client/tableau-bord" element={<TableauBordClient />} />
            <Route path="/client/virement" element={<Virement />} />
          </Route>

          {}
          <Route element={<RouteProtegee allowedRoles={[]} />}>
            <Route path="/admin/tableau-bord" element={<TableauBordAdmin />} />
          </Route>

          {}
          <Route path="/changer-mot-de-passe" element={<ChangerMotDePasse />} />

          {}
          <Route path="/non-autorise" element={<NonAutorise />} />
          <Route path="*" element={<NonTrouve />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
