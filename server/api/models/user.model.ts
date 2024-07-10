import mongoose, { Schema, Model, Document } from 'mongoose'

export interface ISubscription {
	title: string
	price: number
	renewalPeriod: string
	startDate: number
	sid: string
}

export interface IUser extends Document {
	uid: string
	first_name: string
	last_name: string
	email: string
	password: string
	subscriptions: ISubscription[]
	token: string
	tgID: string
	hash: string
	emailVerified: boolean
}

type UserInput = {
	uid: IUser['uid']
	first_name: IUser['first_name']
	last_name: IUser['last_name']
	email: IUser['email']
	password: IUser['password']
	subscriptions: IUser['subscriptions']
	token: IUser['token']
	tgID: IUser['tgID']
	hash: IUser['hash']
	emailVerified: IUser['emailVerified']
}

const UserSchema = new Schema(
	{
		uid: {
			type: Schema.Types.String,
			required: false,
			unique: true,
		},
		first_name: {
			type: Schema.Types.String,
			required: true,
			unique: false,
		},
		last_name: {
			type: Schema.Types.String,
			required: true,
			unique: false,
		},
		email: {
			type: Schema.Types.String,
			required: true,
			unique: true,
		},
		password: {
			type: Schema.Types.String,
			required: true,
			unique: false,
		},
		subscriptions: {
			type: [
				{
					title: { type: Schema.Types.String, required: true },
					price: { type: Schema.Types.Number, required: true },
					renewalPeriod: {
						type: Schema.Types.String,
						required: true,
					},
					startDate: { type: Schema.Types.Number, required: true },
					sid: { type: Schema.Types.String, required: true },
				},
			],
			required: false,
			unique: false,
		},
		token: {
			type: Schema.Types.String,
			required: false,
			unique: true,
		},
		tgID: {
			type: Schema.Types.String,
			required: false,
			unique: false,
		},
		hash: {
			type: Schema.Types.String,
			required: false,
			unique: true,
		},
		emailVerified: {
			type: Schema.Types.Boolean,
			required: false,
			unique: false,
		}
	},
	{
		collection: 'users',
		timestamps: true,
	},
)

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema)

export { User, UserInput, IUser as UserDocument }
