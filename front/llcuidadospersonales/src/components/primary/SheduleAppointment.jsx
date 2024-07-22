import { Formik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import getCurrentDate from "../../helpers/getCurrentDate";
import { useSelector } from "react-redux";
import getNextDate from "../../helpers/getCurrentDate";

function SheduleAppointment() {
    const navigate = useNavigate();
    const userId = useSelector(state => state.user.userId); // Obtener el estado del usuario


    const validate = (values) => {
        const errors = {};

        if (!values.date) {
            errors.date = "Debe seleccionar una fecha.";
        }
        if (!values.time) {
            errors.time = "Debe seleccionar una hora.";
        } else if (!/^((08|09|1[0-8]):[0-5][0-9]|19:00)$/.test(values.time)) {
            errors.time = "La hora debe estar entre las 8:00 y las 19:00.";
        }

        return errors;
    };

    return (

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-5 space-x-4 md:space-x-0 mx-10">

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Formik
                        initialValues={{ service: '', date: '', time: '' }}
                        validate={validate}
                        onSubmit={(values, { setSubmitting }) => {
                            const requestBody = {
                                date: values.date,
                                time: values.time,
                                serviceId: Number(values.service) || 1,
                                userId: userId

                            }
                            axios.post('http://localhost:3001/appointments/schedule', requestBody)
                                .then((response) => {
                                    console.log(response);
                                    setSubmitting(false);
                                    navigate('/appointments')
                                })
                                .catch((error) => {
                                    console.log(error);
                                    setSubmitting(false);
                                });

                        }
                        }
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
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">Crear turno</h1>

                                <div>
                                    <label htmlFor="service" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Servicio
                                    </label>
                                    <select
                                        onChange={handleChange}
                                        // onBlur={handleBlur}
                                        name="service"
                                        value={values.service}
                                        id="service"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="1">Masajes relajantes</option>
                                        <option value="2">Podologia</option>
                                        <option value="3">Limpieza Facial</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                                        Fecha
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="date"
                                            name="date"
                                            type="date"
                                            className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.date}
                                            min={getNextDate()}
                                        />
                                        {errors.date && touched.date && <p className='text-red-500 text-sm mt-2'>{errors.date}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="time" className="block text-sm font-medium leading-6 text-gray-900">
                                        Hora
                                    </label>
                                    <div className="mt-2">
                                        <CustomTimeInput
                                            id="time"
                                            name="time"
                                            value={values.time}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.time && touched.time && <p className='text-red-500 text-sm mt-2'>{errors.time}</p>}


                                    </div>
                                </div>


                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Crear turno
                                    </button>
                                </div>
                            </form>

                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}


function CustomTimeInput({ id, name, value, onChange, onBlur }) {
    const hoursOptions = Array.from({ length: 12 }, (_, i) => (i + 8).toString().padStart(2, "0"));
    const minutesOptions = ["00", "30"];

    const handleTimeChange = (event) => {
        const { name, value } = event.target;
        onChange({ target: { name, value } });
    };

    return (
        <select
            id={id}
            name={name}
            value={value}
            onChange={handleTimeChange}
            onBlur={onBlur}
            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
            {hoursOptions.map((hour) => (
                minutesOptions.map((minute) => (
                    <option key={`${hour}:${minute}`} value={`${hour}:${minute}`}>{`${hour}:${minute}`}</option>
                ))
            ))}
        </select>
    );
}
export default SheduleAppointment