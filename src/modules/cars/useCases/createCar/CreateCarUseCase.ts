import { inject, injectable } from "tsyringe";

import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepositoryImpl")
    private carsRepositoryImpl: ICarsRepository,
    @inject("CategoriesRepositoryImpl")
    private categoryRepositoryImpl: ICategoriesRepository
  ) {}
  async execute({
    name,
    description,
    daily_rate,
    fine_amount,
    license_plate,
    brand,
    category_id,
  }: ICreateCarsDTO): Promise<Car> {
    const checkCarAlreadyExists =
      await this.carsRepositoryImpl.findByLicensePlate(license_plate);

    if (checkCarAlreadyExists) {
      throw new AppError("Car Already Exists!");
    }

    const checkCategoryExists = await this.categoryRepositoryImpl.findById(
      category_id
    );

    if (!checkCategoryExists) {
      throw new AppError("Category not Exists!");
    }

    const car = await this.carsRepositoryImpl.create({
      name,
      description,
      daily_rate,
      fine_amount,
      license_plate,
      brand,
      category_id,
    });

    return car;
  }
}

export { CreateCarUseCase };
