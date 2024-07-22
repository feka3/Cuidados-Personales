import React from 'react';
import { Formik } from 'formik';
import { validate } from '../../helpers/validate/validate';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-gray-50">
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-lg bg-white rounded-lg shadow-md">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Crear una cuenta
                        </h1>

                        <Formik
                            initialValues={{ email: '', password: '', name: '', birthdate: '', nDni: '', username: '', confirmPassword: '' }}
                            validate={validate}
                            onSubmit={(values, { setSubmitting, setFieldError }) => {
                                const requestBody = {
                                    name: values.name,
                                    email: values.email,
                                    birthdate: values.birthdate,
                                    nDni: values.nDni,
                                    credentials: {
                                        username: values.username,
                                        password: values.password
                                    }
                                }
                                axios.post('http://localhost:3001/users/register', requestBody)
                                    .then((response) => {
                                        console.log(response);
                                        navigate('/users/login');
                                        setSubmitting(false);
                                    })
                                    .catch((error) => {
                                        if (error.response.data.error.includes("correo")) {
                                            setFieldError('email', 'Email en uso.');
                                        } else if (error.response.data.error.includes("usuario")) {
                                            setFieldError('username', 'Usuario en uso.');
                                        }
                                        setSubmitting(false);
                                    });
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                            }) => (
                                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nombre completo</label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className={`bg-gray-50 border ${errors.name && touched.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                                placeholder="Laura Louro"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                            />
                                            {errors.name && touched.name && <p className='text-red-500 text-sm mt-2'>{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900">Fecha de nacimiento</label>
                                            <input
                                                type="date"
                                                name="birthdate"
                                                id="birthdate"
                                                className={`bg-gray-50 border ${errors.birthdate && touched.birthdate ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.birthdate}
                                            />
                                            {errors.birthdate && touched.birthdate && <p className='text-red-500 text-sm mt-2'>{errors.birthdate}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="nDni" className="block mb-2 text-sm font-medium text-gray-900">DNI</label>
                                            <input
                                                type="number"
                                                name="nDni"
                                                id="nDni"
                                                className={`bg-gray-50 border ${errors.nDni && touched.nDni ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                                placeholder="20498363"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.nDni}
                                            />
                                            {errors.nDni && touched.nDni && <p className='text-red-500 text-sm mt-2'>{errors.nDni}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`bg-gray-50 border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                                placeholder="lauralouro@hotmail.com"
                                                value={values.email}
                                            />
                                            {errors.email && touched.email && <p className='text-red-500 text-sm mt-2'>{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 mt-5">Usuario</label>
                                            <input
                                                type="text"
                                                name="username"
                                                id="username"
                                                className={`bg-gray-50 border ${errors.username && touched.username ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                                placeholder="lauralouro01"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.username}
                                            />
                                            {errors.username && touched.username && <p className='text-red-500 text-sm mt-2'>{errors.username}</p>}
                                        </div>
                                        <div></div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                                            <input
                                                type="password"
                                                name="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="••••••••"
                                                className={`bg-gray-50 border ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                                value={values.password}
                                            />
                                            {errors.password && touched.password && <p className='text-red-500 text-sm mt-2'>{errors.password}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirmar contraseña</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                placeholder="••••••••"
                                                className={`bg-gray-50 border ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.confirmPassword}
                                            />
                                            {errors.confirmPassword && touched.confirmPassword && <p className='text-red-500 text-sm mt-2'>{errors.confirmPassword}</p>}
                                        </div>
                                        <button disabled={isSubmitting} type="submit" className="w-full mt-5 col-span-2 bg-indigo-700 text-white border border-gray-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Crear cuenta</button>
                                        <p className="col-span-2 text-sm text-center font-light text-gray-500">
                                            ¿Ya tienes una cuenta?
                                            <Link to='/users/login' className='font-medium text-primary-600 hover:underline ml-2'>
                                                Inicia sesión aquí
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
