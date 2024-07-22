import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { cancelAppointment } from "../../redux/userSlice";
import ConfirmationCancel from "../../components/secondary/confirmationCancel";




function formatFecha(fecha) {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getUTCDate().toString().padStart(2, "0");
    const mes = (fechaObj.getUTCMonth() + 1).toString().padStart(2, "0");
    const año = fechaObj.getUTCFullYear();
    return `${dia}-${mes}-${año}`;
}


function Appointment({ id, date, status, time, service }) {

    const fechaFormateada = formatFecha(date);
    const formattedTime = time.split(':').slice(0, 2).join(':');
    const dispatch = useDispatch();
    const [appointmentStatus, setAppointmentStatus] = useState(status);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleCancelAppointmentt = () => {
        setShowConfirmation(true);
    };

    const handleCancelAppointment = async () => {
        try {
            setShowConfirmation(false);
            await axios.put(`http://localhost:3001/appointments/cancel`, { id });
            dispatch(cancelAppointment(id));
            setAppointmentStatus("CANCELED");

        } catch (error) {
            console.error('Error al cancelar el turno', error);
        }
    };

    return (
        <div>
            <li key={id} className="grid grid-cols-5 justify-center gap-x-6 py-5 mt-2">
                {/* Agregar servicio */}
                <div className="flex flex-col items-center col-span-1 justify-center">
                    <p className="text-sm leading-6 text-gray-900 font-bold text-left">{service}</p>
                </div>


                {/* Agregar la fecha */}
                <div className="flex flex-col items-center justify-center">
                    <p className="text-m leading-6 text-gray-900 font-semibold">{fechaFormateada}</p>
                </div>
                {/* Agregar la hora */}
                <div className="flex flex-col items-center justify-center">
                    <p className="text-m leading-6 text-gray-900 font-semibold">{formattedTime}</p>
                </div>

                <div className="flex flex-col items-center">
                    <button
                        onClick={handleCancelAppointmentt}
                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-5 rounded-lg bg-red-700 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    >
                        Cancelar
                    </button>
                </div>
                {showConfirmation && (
                    <ConfirmationCancel
                        message="¿Estás seguro de que deseas cancelar el turno?"
                        onConfirm={handleCancelAppointment} // Usa la función handleCancelAppointment para cancelar el turno
                        onCancel={() => setShowConfirmation(false)} // Usa una función para cerrar el modal de confirmación
                    />
                )}


                {/* Agregar el estado */}
                <div className="flex flex-col items-center justify-center">
                    {appointmentStatus === "ACTIVE" ? (
                        <div className="mt-1 flex items-center gap-x-1.5">
                            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </div>
                            <p className="text-m leading-5 text-gray-500">Activo</p>
                        </div>
                    ) : (
                        <div className="mt-1 flex items-center gap-x-1.5">
                            <div className="flex-none rounded-full bg-red-500/20 p-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                            </div>
                            <p className="text-m leading-5 text-gray-500">Cancelado</p>
                        </div>
                    )}
                </div>


            </li>
            <hr />

        </div>
    )
}

export default Appointment