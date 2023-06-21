import "./App.css";
import Instituicao from "./page/instituicao/Instituicao";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./page/Home";
import EditInstituicao from "./page/instituicao/EditInstituicao";

import Login from "./page/Login/Login";
import Cadastra from "./page/Login/Cadastra";
import DashBoard from "./page/DashBoard/DashBoard";
import TablePontodeVendas from "./page/PontodeVendas/TablePontodeVendas";
import EditTablePontodeVendas from "./page/PontodeVendas/EditTablePontodeVendas";
import TablePagamento from "./page/Pagamento/TablePagamentos";
import EditPagamento from "./page/Pagamento/EditPagamento";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instituicao" element={<Instituicao />} />
        <Route path="/instituicao/:id" element={<EditInstituicao />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastra />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/pointofsales" element={<TablePontodeVendas />} />
        <Route path="/pointofsales/:id" element={<EditTablePontodeVendas />} />
        <Route path="/pagamento" element={<TablePagamento />} />
        <Route path="/pagamento/:id" element={<EditPagamento/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
