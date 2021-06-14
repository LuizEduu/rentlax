import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CategoryRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoryRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoryRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(
      carsRepositoryInMemory,
      categoriesRepositoryInMemory
    );
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "test",
      description: "description test",
      daily_rate: 70,
      license_plate: "license plate test",
      fine_amount: 30,
      brand: "brand test",
      category_id: "category id test",
    });

    expect(car).toMatchObject({
      name: "test",
      description: "description test",
      brand: "brand test",
      available: true,
      daily_rate: 70,
      category_id: "category id test",
      fine_amount: 30,
      license_plate: "license plate test",
      created_at: car.created_at,
    });

    expect(car).toHaveProperty("id");
  });

  it("shoud not be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "test",
        description: "description test",
        daily_rate: 70,
        license_plate: "license plate test",
        fine_amount: 30,
        brand: "brand test",
        category_id: "category id test",
      });

      await createCarUseCase.execute({
        name: "test",
        description: "description test",
        daily_rate: 70,
        license_plate: "license plate test",
        fine_amount: 30,
        brand: "brand test",
        category_id: "category id test",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shoud be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "test",
      description: "description test",
      daily_rate: 70,
      license_plate: "license plate test",
      fine_amount: 30,
      brand: "brand test",
      category_id: "category id test",
    });

    expect(car.available).toBe(true);
  });
});
