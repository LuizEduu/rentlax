import fs from "fs";

import { AppError } from "@shared/errors/AppError";

export const deleteFile = async (filename: string): Promise<void> => {
  try {
    await fs.promises.stat(filename);
  } catch {
    throw new AppError("File not found");
  }

  await fs.promises.unlink(filename);
};
