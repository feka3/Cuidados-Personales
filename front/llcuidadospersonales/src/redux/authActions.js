// Ejemplo de acción de login
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('users/login', async ({ username, password }) => {
    const response = await axios.post('http://localhost:3001/login', { username, password });
    return response.data;
});
