import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
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
      daily_rate: 22,
      category_id: "category id test",
      fine_amount: 30,
      license_plate: "license plate test",
    });

    expect(car).toHaveProperty("id");
  });
});
