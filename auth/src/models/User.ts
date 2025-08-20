import { Schema, model, Document, Types } from "mongoose";
import crypto from "crypto";

export interface IUser extends Document {
    _id: Types.ObjectId;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    fullName: string;
    phone?: string;
    profession?: string;
    birthDate?: Date;
    gender?: "male" | "female";
    role: string;
    photoUrl?: string;
    isVerified?:boolean;
    refreshToken?: string;
    serviceId?: string; // tek servis id tutacaksan
    verificationCode?: string;
    verificationCodeExpires?: Date;
    isDeleted?: boolean;
}

const userSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true, index: true },
        passwordHash: { type: String, required: true },
        passwordSalt: { type: String, required: true },
        fullName: { type: String, required: true },
        phone: { type: String },
        profession: { type: String },
        birthDate: { type: Date },
        gender: { type: String, enum: ["male", "female"] },
        role: { type: String, default: "user" },
        photoUrl: { type: String },
        isVerified: { type: Boolean, default: false },
        refreshToken: { type: String },
        serviceId: { type: String },
        verificationCode: { type: String },
        verificationCodeExpires: { type: Date },
        isDeleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

// Eğer verification alanları boşsa otomatik üret:
userSchema.pre<IUser>("save", function (next) {
    if (!this.verificationCode) {
        this.verificationCode = crypto.randomInt
            ? crypto.randomInt(100000, 999999).toString()
            : Math.floor(100000 + Math.random() * 900000).toString();
    }
    if (!this.verificationCodeExpires) {
        this.verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 dk
    }
    next();
});

export const User = model<IUser>("User", userSchema);
