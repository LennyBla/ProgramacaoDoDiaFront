import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import AdministracaoCard from './paginas/Administracao/Fromulario/CardAdm/AdministracaoCard';
import FormularioCard from './paginas/Administracao/Fromulario/CardAdm/FormularioCard';
import FormularioKids from './paginas/Administracao/Fromulario/KidsAdm/FormularioKids';
import AdministracaoKids from './paginas/Administracao/Fromulario/KidsAdm/AdministracaoKids';
import CadastroAdm from './paginas/Administracao/Logs/CadastroAdm/CadastroAdm';
import Cadastro from './paginas/Administracao/Logs/Cadastro/Cadastro';
import Login from './paginas/Administracao/Logs/LoginAdm/Login';
import PaginaBaseAdmin from './paginas/Administracao/PagBaseAdmin';
import NotFund from './paginas/NotFund/NotFund';
import RotaPrivada from './utils/RotaPrivada';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="cadastroAdm" element={<CadastroAdm />} />
      <Route path="cadastro" element={<Cadastro />} />

      <Route element={<RotaPrivada />}>
        <Route path="/admin" element={<PaginaBaseAdmin />}>
          <Route index element={<AdministracaoCard />} />
          <Route path="card" element={<AdministracaoCard />} />
          <Route path="card/novo" element={<FormularioCard />} />
          <Route path="card/:id" element={<FormularioCard />} />
          <Route path="kids" element={<AdministracaoKids />} />
          <Route path="kids/novo" element={<FormularioKids />} />
          <Route path="kids/:id" element={<FormularioKids />} />
        </Route>
      </Route>

      <Route path='*' element={<NotFund />} />
    </Routes>
  );
}
export default App;