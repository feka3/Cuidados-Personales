import { useEffect, useState } from "react";
import Appointment from "../../components/primary/Appointment";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAppointments } from "../../redux/userSlice";

function MyAppointments() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.userId);
    const [userAppointments, setUserAppointments] = useState([]);
    const appointments = useSelector(state => state.user.appointments);



    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:3001/users/${userId}`)
                .then((response) => {
                    const sortedAppointments = response.data.appointments.sort((a, b) => new Date(b.date) - new Date(a.date));

                    setUserAppointments(sortedAppointments);
                    dispatch(setAppointments(sortedAppointments));

                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [userId, dispatch]);

    const handleCancelAppointment = async (cancelledAppointmentId) => {
        try {
            await axios.put(`http://localhost:3001/appointments/cancel`, { id: cancelledAppointmentId });
            const response = await axios.get(`http://localhost:3001/users/${userId}`);
            const sortedAppointments = response.data.appointments.sort((a, b) => new Date(b.date) - new Date(a.date));
            setUserAppointments(sortedAppointments);
            dispatch(setAppointments(sortedAppointments));
        } catch (error) {
            console.error('Error al cancelar el turno', error);
        }
    };

    return (
        <>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-5 space-x-4 md:space-x-0 mx-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Mis turnos</h1>
                        <p className="mt-2 text-sm text-gray-600 mb-5">
                            Aquí se muestran los turnos que tienes programados.
                        </p>
                    </div>
                    <Link to="/appointments/shedule">
                        <button
                            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                            type="button"
                        >
                            Agregar turno
                        </button>
                    </Link>
                </div>
                {userAppointments.length === 0 ? (
                    <p className="text-center text-sm my-20 font-medium text-gray-900">No tienes turnos programados.</p>
                ) : (
                    userAppointments.map((turno) => (
                        <Appointment
                            key={turno.id}
                            id={turno.id}
                            date={turno.date}
                            status={turno.status}
                            time={turno.time}
                            service={turno.service.name}
                            onCancel={handleCancelAppointment}
                        />
                    ))
                )}


            </div>
        </>
    );
}

export default MyAppointments;
