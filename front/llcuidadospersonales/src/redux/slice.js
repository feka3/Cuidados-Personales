import { createSlice } from "@reduxjs/toolkit"
import { cancelAppointment } from "./appointmentsSlice";

const initialState = {
    userId: 0,
    appointments: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userId = action.payload.userId;
        },
        logout: (state) => {
            state.userId = 0;
        },
        setAppointments: (state, action) => {
            state.appointments = action.payload.appointments;
        },

        cancelAppointment: (state, action) => {
            state.appointments = state.appointments.filter(appointment => appointment.id !== action.payload.appointmentId);

        }
    }
})