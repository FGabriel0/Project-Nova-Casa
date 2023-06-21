import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthentication = (url) => {
  const navigate = useNavigate()
  const [data, setData] = useState(null);

  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirm,setConfirm] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);

        const json = await res.json();

        setData(json);
      } catch (error) {
        console.log(error.menssage);
        setError("Houve uma Falha ao Cadastra!");
      }
      setLoading(false);
    };
    fetchData();
  }, [url, callFetch]);

  const logout = () => {
    navigate("/")
  };

  const Auth = (user) => {
    try {
      const usuarioEncontrado = data.find(
        (usuario) =>
          usuario.displayName === user.displayName &&
          usuario.password === user.password
      );
  
      if (usuarioEncontrado) {
        navigate("/dashboard");
      } else {
        setError("Nome ou Senha Incorreto !");
        navigate("/login")
      }
    } catch (error) {
      // Trate o erro aqui
      console.error("Ocorreu um erro:", error);
      
    }
  };

  const httpConfig = async (user,method) => {
    const User = data.find(
      (u) => u.displayname === user.displayname && u.password === user.password
    );
    if (User) {
      setError("Usuário já cadastrado");
      return
    }
    else{

      if(method === "POST"){
        const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const newUser = await res.json();
      setData([...data, newUser]);
      setError(null);
    }

      setConfirm("Cadastro Finalizado com Sucesso!")
    }
  };

  useEffect(() => {
    const httpRequest = async () => {
      let json;
      if (method === "POST") {
        let fetchOptions = [url, config];

        const res = await fetch(...fetchOptions);
        json = await res.json();
      }

      setCallFetch(json);
    };
    httpRequest();
  }, [config, method, url, data]);

  return { data, httpConfig, loading, error,confirm,logout,Auth};
};
