import { useEffect, useState } from 'react'
import Client from '../components/Client'

const Home = () => {

  const [clients, setClients] = useState([])

  useEffect(() => {
    const getClientsAPI = async () => {
      try {
        const url = 'http://localhost:4000/clients'
        const response = await fetch(url)
        const result = await response.json()

        setClients(result)
      } catch (err) {
        console.log(err);
      }
    }

    getClientsAPI()
  }, [])

  const handleDelete = async id => {
    const confirm = window.confirm('Desea eliminar este cliente?')
    if (confirm) {
      try {
        const url = `http://localhost:4000/clients/${id}`
        const response = await fetch(url, {
          method: 'DELETE',
        })
        await response.json()

        const arrClients = clients.filter(x => x.id !== id)
        setClients(arrClients)
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-10">Administra tus clientes</p>

      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead className='bg-blue-800 text-white'>
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Contacto</th>
            <th className='p-2'>Empresa</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {clients.map(x => (
            <Client
              key={x.id}
              client={x}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>

      </table>

    </>
  )
}

export default Home