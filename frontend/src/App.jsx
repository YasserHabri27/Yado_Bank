import { Routes, Route, Navigate } from 'react-router-dom';
import Connexion from './pages/Connexion';
import MiseEnPage from './composants/MiseEnPage';
import RouteProtegee from './composants/RouteProtegee';
import TableauBordAgent from './pages/agent/TableauBordAgent';
import TableauBordClient from './pages/client/TableauBordClient';
import AjouterClient from './pages/agent/AjouterClient';
import AjouterCompte from './pages/agent/AjouterCompte';
import Virement from './pages/client/Virement';
import ChangerMotDePasse from './pages/ChangerMotDePasse';
import NonAutorise from './pages/NonAutorise';
import NonTrouve from './pages/NonTrouve';


function App() {
  return (
    <Routes>
      <Route path="/connexion" element={<Connexion />} />

      <Route element={<MiseEnPage />}>
        {/* Agent Routes */}
        <Route element={<RouteProtegee allowedRoles={['AGENT_GUICHET']} />}>
          <Route path="/agent/tableau-bord" element={<TableauBordAgent />} />
          <Route path="/agent/ajouter-client" element={<AjouterClient />} />
          <Route path="/agent/ajouter-compte" element={<AjouterCompte />} />
        </Route>

        {/* Client Routes */}
        <Route element={<RouteProtegee allowedRoles={['CLIENT']} />}>
          <Route path="/client/tableau-bord" element={<TableauBordClient />} />
          <Route path="/client/virement" element={<Virement />} />
        </Route>

        {/* Shared Routes */}
        <Route path="/changer-mot-de-passe" element={<ChangerMotDePasse />} />


        {/* Error Routes */}
        <Route path="/non-autorise" element={<NonAutorise />} />
        <Route path="*" element={<NonTrouve />} />

        <Route path="/" element={<Navigate to="/connexion" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
