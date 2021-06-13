import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  name?: string;
  brand?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepositoryImpl")
    private carsRepositoryImpl: ICarsRepository
  ) {}

  async execute({ name, brand, category_id }: IRequest): Promise<Car[]> {
    return this.carsRepositoryImpl.listAvailable(brand, name, category_id);
  }
}

export { ListAvailableCarsUseCase };
