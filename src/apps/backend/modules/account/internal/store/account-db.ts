import { Schema, Types } from 'mongoose';

export interface AccountDB {
  _id: Types.ObjectId;
  active: boolean;
  name: string;
  username: string;
  password: string;
  email: string;
  todos: Types.ObjectId[]; // Assuming 'todos' is an array of ObjectId
}

export const accountDbSchema: Schema = new Schema<AccountDB>(
  {
    active: { type: Boolean, required: true },
    name: { type: String, required: true },
    username: {
      type: String,
      index: true,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    email: { type: String, required: true },
    todos: [{ type: Types.ObjectId, ref: 'Todo' }], // Assuming 'Todo' is the model name for todos
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);
