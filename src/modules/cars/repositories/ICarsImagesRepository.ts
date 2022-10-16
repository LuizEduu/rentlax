import { CarImage } from "../infra/typeorm/entities/CarImage";

export interface ICarsImagesRepository {
  create(carId: string, imagesNames: string[]): Promise<void>;
}
