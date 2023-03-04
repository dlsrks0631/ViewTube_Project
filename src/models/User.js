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
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

// 저장된 비밀번호 HASH 해주는 함수
// 비밀번호를 저장하기 전에 잠깐 가로챔?서 작업하는 그런느낌임
userSchema.pre("save", async function () {
  // 비밀번호가 수정되었을 시에만 새롭게 Hash
  // this == user / await bcrypt.hash(해시할 비밀번호, saltRound)
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
