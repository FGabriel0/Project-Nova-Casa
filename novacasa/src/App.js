import "./App.css";
import Instituicao from "./page/instituicao/Instituicao";
import { useEffect,useState } from "react";
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
import Produtos from "./page/Produtos/Produtos";
import Transferencias from "./page/Transferencias/Transferencias";
import NewInstituicao from "./page/instituicao/NewInstituicao";
import NewPagamento from "./page/Pagamento/NewPagamento";
import NewPontodeVendas from "./page/PontodeVendas/NewPontodeVendas";
import NewProduto from "./page/Produtos/NewProduto";
import NewTransferencia from "./page/Transferencias/NewTransferencia";

import { SidebarProvider } from "./context/SidebarContext";
import Loading from "./components/Loading";
function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <SidebarProvider>    
      {loading && <Loading/>}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/instituicao" element={<Instituicao />} />
          <Route path="/newInstituicao" element={<NewInstituicao />} />
          <Route path="/instituicao/:id" element={<EditInstituicao />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastrar" element={<Cadastra />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/pointofsales" element={<TablePontodeVendas />} />
          <Route
            path="/pointofsales/:id"
            element={<EditTablePontodeVendas />}
          />
          <Route path="/newPontodeVendas" element={<NewPontodeVendas />} />
          <Route path="/pagamento" element={<TablePagamento />} />
          <Route path="/pagamento/:id" element={<EditPagamento />} />
          <Route path="/newPagamento" element={<NewPagamento />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/newProduto" element={<NewProduto />} />
          <Route path="/transferencia" element={<Transferencias />} />
          <Route path="/newTranferencia" element={<NewTransferencia />} />
        </Routes>
      </BrowserRouter>
    </SidebarProvider>
  );
}

export default App;
