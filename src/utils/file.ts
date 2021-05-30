import fs from "fs";

import { AppError } from "../errors/AppError";

export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename);
  } catch {
    throw new AppError("File not found");
  }

  await fs.promises.unlink(filename);
};
