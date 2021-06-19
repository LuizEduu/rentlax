import { getRepository, Repository } from "typeorm";

import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepositoryImpl implements ICarsRepository {
  private carsRepository: Repository<Car>;

  constructor() {
    this.carsRepository = getRepository(Car);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarsDTO): Promise<Car> {
    const car = this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    await this.carsRepository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.carsRepository.findOne({ license_plate });
  }

  async listAvailable(
    brand?: string,
    name?: string,
    category_id?: string
  ): Promise<Car[]> {
    const listAvailableCarsQuery = this.carsRepository
      .createQueryBuilder("c")
      .where("c.available = :available", { available: true });

    if (brand) {
      listAvailableCarsQuery.andWhere("c.brand = :brand", { brand });
    }

    if (name) {
      listAvailableCarsQuery.andWhere("c.name = :name", { name });
    }

    if (category_id) {
      listAvailableCarsQuery.andWhere("c.category_id = :category_id", {
        category_id,
      });
    }

    const cars = await listAvailableCarsQuery.getMany();

    return cars;
  }

  findById(id: string): Promise<Car> {
    return this.carsRepository.findOne(id);
  }
}

export { CarsRepositoryImpl };
