import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alert from './Alert'
import Spinner from './Spinner'

const FormOne = ({ client, loading }) => {

    const navigate = useNavigate()

    const newClientSchema = Yup.object().shape({
        name: Yup
            .string()
            .min(3, 'El nombre es muy corto')
            .max(20, 'El nombre es muy largo')
            .required('El nombre del cliente es obligatorio'),

        company: Yup
            .string()
            .required('El nombre de la empresa es obligatorio'),

        email: Yup
            .string()
            .email('Email no valido')
            .required('El email es obligatorio'),

        phone: Yup
            .number()
            .positive('Numero no valido')
            .integer('Numero no valido')
            .typeError('Numero no valido'),
    })

    const handleAPI = async (id, mt, values) => {
        const url = `http://localhost:4000/clients${id}`
        const response = await fetch(url, {
            method: mt,
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json()
    }

    const handleSubmit = async (values) => {
        try {
            if (client.id) {
                await handleAPI(`/${client.id}`, 'PUT', values)
            } else {
                await handleAPI('', 'POST', values)
            }
            navigate('/clients')
        } catch (err) {
            console.log(err);
        }
    }

    return (
        loading ? <Spinner /> : (

            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
                <h1 className="text-gray-600 font-bold text-xl uppercase text-center">{client?.name ? 'Editar cliente' : 'Agregar cliente'}</h1>

                <Formik
                    initialValues={{
                        name: client?.name ?? '',
                        company: client?.company ?? '',
                        email: client?.email ?? '',
                        phone: client?.phone ?? '',
                        notes: client?.notes ?? ''
                    }}
                    enableReinitialize={true}
                    validationSchema={newClientSchema}
                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values)
                        resetForm()
                    }}
                >
                    {({ errors, touched }) => {

                        return (
                            <Form
                                className='mt-10'
                            >
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='nombre'
                                    >Nombre: </label>
                                    <Field
                                        id='nombre'
                                        type='text'
                                        className='mt-2 block w-full p-3 bg-gray-50'
                                        placeholder='Nombre del cliente'
                                        name='name'
                                    />
                                    {errors.name && touched.name ? (
                                        <Alert>{errors.name}</Alert>
                                    ) : null}

                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='empresa'
                                    >Empresa: </label>
                                    <Field
                                        id='empresa'
                                        type='text'
                                        className='mt-2 block w-full p-3 bg-gray-50'
                                        placeholder='Empresa del cliente'
                                        name='company'
                                    />
                                    {errors.company && touched.company ? (
                                        <Alert>{errors.company}</Alert>
                                    ) : null}

                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='email'
                                    >Email: </label>
                                    <Field
                                        id='email'
                                        type='email'
                                        className='mt-2 block w-full p-3 bg-gray-50'
                                        placeholder='Email del cliente'
                                        name='email'
                                    />
                                    {errors.email && touched.email ? (
                                        <Alert>{errors.email}</Alert>
                                    ) : null}

                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='telefono'
                                    >telefono: </label>
                                    <Field
                                        id='telefono'
                                        type='tel'
                                        className='mt-2 block w-full p-3 bg-gray-50'
                                        placeholder='Telefono del cliente'
                                        name='phone'
                                    />
                                    {errors.phone && touched.phone ? (
                                        <Alert>{errors.phone}</Alert>
                                    ) : null}

                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='notas'
                                    >Notas: </label>
                                    <Field
                                        as='textarea'
                                        id='notas'
                                        type='text'
                                        className='mt-2 block w-full p-3 bg-gray-50 h-40'
                                        placeholder='Notas del cliente'
                                        name='notes'
                                    />
                                </div>

                                <input
                                    type='submit'
                                    value={client?.name ? 'Editar cliente' : 'Agregar cliente'}
                                    className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg cursor-pointer'
                                />
                            </Form>
                        )
                    }}
                </Formik>

            </div>
        )
    )
}

FormOne.defaultProps = {
    client: {},
    loading: false
}

export default FormOne