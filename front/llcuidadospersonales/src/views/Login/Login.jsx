import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, setAppointments } from "../../redux/userSlice";

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const authError = useSelector(state => state.user.error);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Iniciar sesión
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Formik
                    initialValues={{ username: '', password: '' }}
                    // onSubmit={(values, { setSubmitting, setFieldError }) => {
                    //     const requestBody = {
                    //         username: values.username,
                    //         password: values.password
                    //     };
                    //     axios.post('http://localhost:3001/users/login', requestBody)
                    //         .then((response) => {
                    //             dispatch(login({ username: values.username }));
                    //             console.log(response);
                    //             navigate('/home');
                    //             setSubmitting(false);
                    //         })
                    //         .catch((error) => {
                    //             console.log(error);
                    //             setFieldError('password', 'Credenciales incorrectas');
                    //             setSubmitting(false);
                    //         });
                    onSubmit={(values, { setSubmitting, setFieldError }) => {
                        const requestBody = {
                            username: values.username,
                            password: values.password
                        };
                        axios.post('http://localhost:3001/users/login', requestBody)
                            .then((response) => {
                                if (response.data.login) {
                                    dispatch(login(response.data.user));
                                    console.log(response.data.user);
                                    navigate('/home');
                                } else {
                                    setFieldError('password', 'Contraseña inválida');
                                }
                                setSubmitting(false);
                            })
                            .catch((error) => {
                                setFieldError('password', 'Contraseña inválida');
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
                        <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Usuario
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.username}
                                    />
                                    {errors.username && touched.username && <p className='text-red-500 text-sm mt-2'>{errors.username}</p>}
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Contraseña
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            ¿Olvidó su contraseña?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />
                                    {errors.password && touched.password && <p className='text-red-500 text-sm mt-2'>{errors.password}</p>}
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !values.username || !values.password}
                                    className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                                    ${isSubmitting || !(values.username && values.password) ? 'bg-indigo-600 opacity-50 cursor-not-allowed' : 'bg-indigo-600'}
                                    `}
                                >
                                    Iniciar sesión
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
                <p className="mt-10 text-center text-sm text-gray-500">
                    ¿No tienes cuenta?{' '}
                    <Link to="/users/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Regístrate aquí
                    </Link>
                </p>
            </div>
        </div >
    );
}
