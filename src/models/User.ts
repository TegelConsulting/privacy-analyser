import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string;
  username?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  username: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User = models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
