import bcrypt from "bcrypt";
import { createUser } from "../repositories/userRepository.js";

export const registerUser = async ({ username, password }) => {
  const passwordHash = await bcrypt.hash(password, 10);

  await createUser({
    username,
    passwordHash,
  });

  return username;
};