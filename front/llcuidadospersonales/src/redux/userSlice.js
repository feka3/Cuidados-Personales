// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    // appointments: [],
    initialState: {
        userId: 0,
        appointments: [], // Agrega un campo para almacenar los turnos del usuario
        isAuthenticated: false,
    },
    reducers: {
        login: (state, action) => {
            state.userId = action.payload.credentials.id;
            state.isAuthenticated = true;
            state.appointments = action.payload.appointments; // Actualiza los turnos del usuario con los datos recibidos

        },
        logout: (state) => {
            state.username = 0;
            state.isAuthenticated = false;
            state.appointments = [];
        },
        setAppointments: (state, action) => {
            state.appointments = action.payload;
        },
        cancelAppointment: (state, action) => {
            // Encuentra el turno por ID y actualiza su estado a 'CANCELADO'
            const cancelledAppointmentId = parseInt(action.payload);
            state.appointments = state.appointments.map(appointment =>
                appointment.id === cancelledAppointmentId ? { ...appointment, status: 'CANCELED' } : appointment
            );

        }


    },
});

export const { login, logout, setAppointments, cancelAppointment } = userSlice.actions;

export default userSlice.reducer;
