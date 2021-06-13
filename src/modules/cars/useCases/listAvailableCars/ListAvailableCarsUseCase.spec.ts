import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });
  it("should be able to a list all cars", async () => {
    await carsRepositoryInMemory.create({
      name: "car test",
      description: "description test",
      brand: "car_brand_test",
      category_id: "category_test",
      daily_rate: 100,
      fine_amount: 50,
      license_plate: "licence_test",
    });

    await carsRepositoryInMemory.create({
      name: "car test 2",
      description: "description test",
      brand: "car_brand_test_2",
      category_id: "category_test",
      daily_rate: 100,
      fine_amount: 50,
      license_plate: "licence_test",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toHaveLength(cars.length);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car test",
      description: "description test",
      brand: "car_brand_test",
      category_id: "category_test",
      daily_rate: 100,
      fine_amount: 50,
      license_plate: "licence_test",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "car test" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    await carsRepositoryInMemory.create({
      name: "car test",
      description: "description test",
      brand: "car_brand_test",
      category_id: "category_test",
      daily_rate: 100,
      fine_amount: 50,
      license_plate: "licence_test",
    });

    await carsRepositoryInMemory.create({
      name: "car test",
      description: "description test",
      brand: "car_brand_test_2",
      category_id: "category_test",
      daily_rate: 100,
      fine_amount: 50,
      license_plate: "licence_test",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "car_brand_test",
    });

    expect(cars).toHaveLength(cars.length);
  });

  it("should be able to list all available cars by category_id", async () => {
    await carsRepositoryInMemory.create({
      name: "car test",
      description: "description test",
      brand: "car_brand_test",
      category_id: "category_test_3",
      daily_rate: 100,
      fine_amount: 50,
      license_plate: "licence_test",
    });

    await carsRepositoryInMemory.create({
      name: "car test",
      description: "description test",
      brand: "car_brand_test_2",
      category_id: "category_test",
      daily_rate: 100,
      fine_amount: 50,
      license_plate: "licence_test",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_test",
    });

    expect(cars).toHaveLength(cars.length);
  });
});
