import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepositoryImpl")
    private carsRepositoryImpl: ICarsRepository,
    @inject("SpecificationsRepositoryImpl")
    private specificationsRepositoryImpl: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const car = await this.carsRepositoryImpl.findById(car_id);

    if (!car) {
      throw new AppError("Car does not Exists!");
    }

    const specifications = await this.specificationsRepositoryImpl.findByIds(
      specifications_id
    );

    Object.assign(car, {
      specifications,
    });

    return this.carsRepositoryImpl.create(car);
  }
}

export { CreateCarSpecificationUseCase };
