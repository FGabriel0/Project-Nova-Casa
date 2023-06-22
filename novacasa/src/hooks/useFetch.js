import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [itemId, setitemId] = useState(null);

  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setMethod(method);
    } else if (method === "DELETE") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
      }); 

      setMethod(method);
      setitemId(data)
    } else if (method === "PUT") {
      setConfig({
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setMethod(method);
      setitemId(data); // Configurar o ID do item a ser atualizado
    }
  };

  // Recebendo informações
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      //Tratando error
      try {
        const res = await fetch(url);

        const json = await res.json();

        setData(json);
      } catch (error) {
        console.log(error.message);
        setError("Houve algum error ao Carregar os Dados!");
      }

      setLoading(false);
    };

    fetchData();
  
  }, [url, callFetch]);

  //   Refatorando Post
  useEffect(() => {
    const httpRequest = async () => {
      let json;

      if (method === "POST") {
        let fetchOptions = [url, config];

        const res = await fetch(...fetchOptions);

        json = await res.json();
      } else if (method === "DELETE") {
        const deleteUrl = `${url}/${itemId}`;

        const res = await fetch(deleteUrl, config);

        json = res.json();
      } else if (method === "PUT") {
        const patchUrl = url;

        const res = await fetch(patchUrl, config);

        json = await res.json();
      }

      setCallFetch(json);
    };

    httpRequest();
  }, [config, method, url, itemId]);

  return { data, httpConfig, loading, error};
};
