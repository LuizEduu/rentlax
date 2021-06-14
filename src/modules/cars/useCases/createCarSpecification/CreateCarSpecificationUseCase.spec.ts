import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryImpl: ICarsRepository;
let specificationsRepositoryImpl: ISpecificationsRepository;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryImpl = new CarsRepositoryInMemory();
    specificationsRepositoryImpl = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryImpl,
      specificationsRepositoryImpl
    );
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryImpl.create({
      name: "test",
      description: "description test",
      daily_rate: 70,
      license_plate: "license plate test",
      fine_amount: 30,
      brand: "brand test",
      category_id: "category id test",
    });

    const specification = await specificationsRepositoryImpl.create({
      name: "specification test",
      description: "test description",
    });

    const secondSpecification = await specificationsRepositoryImpl.create({
      name: "Second specification",
      description: "test description second specification",
    });

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id, secondSpecification.id],
    });

    expect(car.specifications).toHaveLength(car.specifications.length);
  });

  it("should not be able to add a new specification to a now-existent car", async () => {
    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id: "car_id_test",
        specifications_id: ["specification_id_Test"],
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
