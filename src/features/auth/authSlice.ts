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

type TErrorResponse = {
	message: string
	error: string
}

export const loginUser= createAsyncThunk<string, { email: string; password: string }, { rejectValue: TErrorResponse }>(
	'auth/loginUser',
	async (credentials: { email: string; password: string }, thunkAPI) => {
		try {
			const response = await axios.post('/auth/login', credentials)
			console.log(response)
			return response.data.token
		} catch (error: unknown) {
			let errorMessage = 'Unknown error';
			if (error.response && error.response.data && error.response.data.message) {
				errorMessage = error.response.data.message;
			}
			return thunkAPI.rejectWithValue({
				error: 'Error',
				message: errorMessage,
			})
		}
	},
)

export const registerUser = createAsyncThunk<
	string,
	{
		first_name: string
		last_name: string
		email: string
		password: string
	},
	{ rejectValue: TErrorResponse }
>(
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
			let errorMessage = 'Unknown error';
			if (error.response && error.response.data && error.response.data.message) {
				errorMessage = error.response.data.message;
			}
			return thunkAPI.rejectWithValue({
				error: 'Error',
				message: errorMessage,
			})
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
				(state, action: PayloadAction<TErrorResponse | undefined>) => {
					state.status = 'failed'
					state.error = action.payload
						? action.payload.error
						: 'Unknown error'
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
				(state, action: PayloadAction<TErrorResponse | undefined>) => {
					state.status = 'failed'
					state.error = action.payload
						? action.payload.error
						: 'Unknown error'
				},
			)
	},
})

export const { logout, setToken } = authSlice.actions

export default authSlice.reducer
