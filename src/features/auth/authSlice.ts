import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from './axios'

interface AuthState {
	token: string | null
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

const initialState: AuthState = {
	token: localStorage.getItem('token'),
	status: 'idle',
	error: null,
}

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async (credentials: { email: string; password: string }, thunkAPI) => {
		try {
			const response = await axios.post('/auth/login', credentials)
			return response.data.token
		} catch (error: unknown) {
			return thunkAPI.rejectWithValue(error.response.data)
		}
	},
)

export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async (
		userData: {
			first_name: string
			last_name: string
			email: string
			password: string
		},
		thunkAPI,
	) => {
		try {
			const response = await axios.post('/auth/register', userData)
			return response.data.token
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data)
		}
	},
)

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.token = null
			localStorage.removeItem('token')
		},
		setToken(state, action: PayloadAction<string | null>) {
			state.token = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(
				loginUser.fulfilled,
				(state, action: PayloadAction<string>) => {
					state.status = 'succeeded'
					state.token = action.payload
					localStorage.setItem('token', action.payload)
				},
			)
			.addCase(
				loginUser.rejected,
				(state, action: PayloadAction<string | null>) => {
					state.status = 'failed'
					state.error = action.payload
				},
			)
			.addCase(registerUser.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(
				registerUser.fulfilled,
				(state, action: PayloadAction<string>) => {
					state.status = 'succeeded'
					state.token = action.payload
					localStorage.setItem('token', action.payload)
				},
			)
			.addCase(
				registerUser.rejected,
				(state, action: PayloadAction<string | null>) => {
					state.status = 'failed'
					state.error = action.payload
				},
			)
	},
})

export const { logout, setToken } = authSlice.actions

export default authSlice.reducer
