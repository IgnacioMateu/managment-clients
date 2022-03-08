import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Form from '../components/Form'

const EditClient = () => {
  const [client, setClient] = useState({})
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    const getClientAPI = async () => {
      try {
        const url = `http://localhost:4000/clients/${id}`
        const response = await fetch(url)
        const result = await response.json()
        setClient(result)
      } catch (err) {
        console.log(err);
      }
      setLoading(!loading)
    }

    getClientAPI()
  }, [])

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar cliente</h1>
      <p className='mt-3'>Utiliza este formulario para editar datos de un cliente</p>

      {client?.name ? (
        <Form
          client={client}
          loading={loading}
        />
      ) : <p><br/>Cliente ID no valido</p>}
    </>
  )
}

export default EditClient