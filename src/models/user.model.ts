import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin:Boolean
}

const userSchema = new Schema({
  username: { type: String},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin:{type:Boolean,default:false}
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
