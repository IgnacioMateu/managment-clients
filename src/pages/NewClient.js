import Form from "../components/Form"

const NewClient = () => {
  return (
      <>
        <h1 className="font-black text-4xl text-blue-900">Nuevo cliente</h1>
        <p className="mt-10">Llena los sigueintes campos para registrar un cliente</p>

        <Form />
      </>
  )
}

export default NewClient