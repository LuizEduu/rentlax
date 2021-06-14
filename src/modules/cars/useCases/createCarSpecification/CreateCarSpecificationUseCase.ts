import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

class CreateCarSpecificationUseCase {
  constructor(
    private carsRepositoryImpl: ICarsRepository,
    private specificationsRepositoryImpl: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const car = await this.carsRepositoryImpl.findById(car_id);

    if (!car) {
      throw new AppError("Car does not Exists!");
    }

    const specifications = await this.specificationsRepositoryImpl.findByIds(
      specifications_id
    );

    car.specifications = specifications;

    const updatedCar = await this.carsRepositoryImpl.create(car);

    console.log(updatedCar);
  }
}

export { CreateCarSpecificationUseCase };
