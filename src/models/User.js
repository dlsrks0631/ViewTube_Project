import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

// 저장된 비밀번호 HASH 해주는 함수
userSchema.pre("save", async function () {
  if (this.isModified("password")) { // 비밀번호가 수정되었을 시에만 새롭게 Hash
    this.password = await bcrypt.hash(this.password, 5); // this == user
  }
});

const User = mongoose.model("User", userSchema);

export default User;
