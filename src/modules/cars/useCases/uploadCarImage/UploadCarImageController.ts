import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const images = request.files as Express.Multer.File[];
    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const filesNames = images.map((file) => file.filename);

    await uploadCarImageUseCase.execute({
      car_id: id,
      images_names: filesNames,
    });

    return response.status(201).send();
  }
}

export { UploadCarImageController };
