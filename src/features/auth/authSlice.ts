// src/features/auth/authSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from './axios';

interface AuthState {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      return response.data.token;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: { first_name: string; last_name: string; email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('/auth/register', userData);
      return response.data.token;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.token = action.payload;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
