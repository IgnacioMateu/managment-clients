import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const SeeClient = () => {
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setLoading(!loading)
    const getClientAPI = async () => {
      try {
        const url = `http://localhost:4000/clients/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        setClient(result);
        console.log(client);
      } catch (err) {
        console.log(err);
      }
      setLoading(false)
    }

    getClientAPI();
  }, []);

  return loading ? (
    <Spinner />
  ) : Object.keys(client).length == 0 ? (
    <p>No hay resultados</p>
  ) : (

    <div>
      <p className="font-block text-4xl text-blue-900">
        Ver cliente: {client.name}
      </p>
      <p className="mt-3">Informacion del cliente</p>

      <p className="text-3xl text-gray-500 mt-10">
        <span className="text-gray-800 uppercase font-bold">Cliente: </span>
        {client.name}
      </p>

      <p className="text-2xl text-gray-500 mt-4">
        <span className="text-gray-800 uppercase font-bold">Email: </span>
        {client.email}
      </p>

      {client.phone && (
        <p className="text-2xl text-gray-500 mt-4">
          <span className="text-gray-800 uppercase font-bold">Telefono: </span>
          {client.phone}
        </p>
      )}

      <p className="text-2xl text-gray-500 mt-4">
        <span className="text-gray-800 uppercase font-bold">Empresa: </span>
        {client.company}
      </p>

      {client.notes && (
        <p className="text-2xl text-gray-500 mt-4">
          <span className="text-gray-800 uppercase font-bold">Notas: </span>
          {client.notes}
        </p>
      )}
    </div>
  );
};

export default SeeClient;
