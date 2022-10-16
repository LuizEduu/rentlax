import { getRepository, Repository } from "typeorm";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

import { CarImage } from "../entities/CarImage";

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(carId: string, imagesNames: string[]): Promise<void> {
    const carImage = imagesNames.map((image) => {
      return this.repository.create({
        car_id: carId,
        image_name: image,
      });
    });

    await this.repository.save(carImage);
  }
}

export { CarsImagesRepository };
