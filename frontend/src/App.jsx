
import { Routes, Route } from 'react-router-dom';
import Connexion from './pages/Connexion';
import MiseEnPage from './composants/MiseEnPage';
import RouteProtegee from './composants/RouteProtegee';
import ScrollToTop from './composants/ScrollToTop';
import TableauBordAgent from './pages/agent/TableauBordAgent';
import TableauBordAdmin from './pages/admin/TableauBordAdmin';
import TableauBordClient from './pages/client/TableauBordClient';
import AjouterClient from './pages/agent/AjouterClient';
import AjouterCompte from './pages/agent/AjouterCompte';
import Virement from './pages/client/Virement';
import ChangerMotDePasse from './pages/ChangerMotDePasse';
import NonAutorise from './pages/NonAutorise';
import NonTrouve from './pages/NonTrouve';
import Accueil from './pages/Accueil';
import ContacterConseiller from './pages/ContacterConseiller';
import MotDePasseOublie from './pages/MotDePasseOublie';


function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MiseEnPage />}>
          {/* Public Routes */}
          <Route path="/" element={<Accueil />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/contacter-conseiller" element={<ContacterConseiller />} />
          <Route path="/mot-de-passe-oublie" element={<MotDePasseOublie />} />

          {/* Agent Routes */}
          <Route element={<RouteProtegee allowedRoles={['ROLE_AGENT_GUICHET']} />}>
            <Route path="/agent/tableau-bord" element={<TableauBordAgent />} />
            <Route path="/agent/ajouter-client" element={<AjouterClient />} />
            <Route path="/agent/ajouter-compte" element={<AjouterCompte />} />
          </Route>

          {/* Client Routes */}
          <Route element={<RouteProtegee allowedRoles={['ROLE_CLIENT']} />}>
            <Route path="/client/tableau-bord" element={<TableauBordClient />} />
            <Route path="/client/virement" element={<Virement />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<RouteProtegee allowedRoles={['ROLE_ADMIN']} />}>
            <Route path="/admin/tableau-bord" element={<TableauBordAdmin />} />
          </Route>

          {/* Shared Routes */}
          <Route path="/changer-mot-de-passe" element={<ChangerMotDePasse />} />

          {/* Error Routes */}
          <Route path="/non-autorise" element={<NonAutorise />} />
          <Route path="*" element={<NonTrouve />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
