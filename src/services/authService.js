import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  getUser,
} from "../repositories/userRepository.js";

export const registerUser = async ({ username, password }) => {
  const passwordHash = await bcrypt.hash(password, 10);

  await createUser({
    username,
    passwordHash,
  });

  return username;
};

export const loginUser = async ({ username, password }) => {
  const user = await getUser(username);

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return null;
  }

  return jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "2h", algorithm: "HS256" }
  );
};