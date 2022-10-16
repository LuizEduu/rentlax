import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

interface IRequest {
  car_id: string;
  images_names: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("carsImagesRepository")
    private readonly carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ car_id, images_names }: IRequest): Promise<void> {
    await this.carsImagesRepository.create(car_id, images_names);
  }
}

export { UploadCarImageUseCase };
