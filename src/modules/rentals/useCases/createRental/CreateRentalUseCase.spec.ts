import dayjs from "dayjs";
import { mock, MockProxy } from "jest-mock-extended";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

describe("create rental use case", () => {
  let rentalsRepository: MockProxy<IRentalsRepository>;
  let dateProvider: IDateProvider;
  let sut: CreateRentalUseCase;

  const expectedReturnDate = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepository = mock();
    dateProvider = new DayJsDateProvider();
    rentalsRepository.findOpenRentalByCar.mockResolvedValue(null);
    rentalsRepository.findOpenRentalByUser.mockResolvedValue(null);
    rentalsRepository.create.mockResolvedValue({
      car_id: "any_car_id",
      user_id: "any_user_id",
      id: "any_id",
      start_date: new Date(),
      end_date: new Date(2022, 11, 20),
      expected_return_date: expectedReturnDate,
      total: 150,
      created_at: new Date(),
      updated_at: new Date(),
    });
    sut = new CreateRentalUseCase(rentalsRepository, dateProvider);
  });

  it("shoud be able to create a new rental", async () => {
    const rental = await sut.execute({
      user_id: "any_user_id",
      car_id: "any_car_id",
      expected_return_date: expectedReturnDate,
    });

    expect(rentalsRepository.findOpenRentalByCar).toHaveBeenCalledTimes(1);
    expect(rentalsRepository.findOpenRentalByCar).toHaveBeenCalledWith(
      "any_car_id"
    );
    expect(rentalsRepository.findOpenRentalByUser).toHaveBeenCalledTimes(1);
    expect(rentalsRepository.findOpenRentalByUser).toHaveBeenCalledWith(
      "any_user_id"
    );
    expect(rentalsRepository.create).toHaveBeenCalledTimes(1);
    expect(rental).toHaveProperty("id");
  });

  it("shoud not be able to create a new rental with carUnavailable", async () => {
    rentalsRepository.findOpenRentalByCar.mockResolvedValue({
      car_id: "any_car_id",
      user_id: "any_user_id",
      id: "any_id",
      start_date: new Date(),
      end_date: new Date(2022, 11, 20),
      expected_return_date: expectedReturnDate,
      total: 150,
      created_at: new Date(),
      updated_at: new Date(),
    });

    try {
      await sut.execute({
        user_id: "any_user_id",
        car_id: "any_car_id",
        expected_return_date: new Date(),
      });
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
      expect(e.message).toEqual("Car is unavailable");
      expect(rentalsRepository.findOpenRentalByCar).toHaveBeenCalledTimes(1);
      expect(rentalsRepository.findOpenRentalByCar).toHaveBeenCalledWith(
        "any_car_id"
      );
    }
  });

  it("shoud not be able to create a new rental with carUnavailable", async () => {
    rentalsRepository.findOpenRentalByUser.mockResolvedValue({
      car_id: "any_car_id",
      user_id: "any_user_id",
      id: "any_id",
      start_date: new Date(),
      end_date: new Date(2022, 11, 20),
      expected_return_date: expectedReturnDate,
      total: 150,
      created_at: new Date(),
      updated_at: new Date(),
    });

    try {
      await sut.execute({
        user_id: "any_user_id",
        car_id: "any_car_id",
        expected_return_date: new Date(),
      });
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
      expect(e.message).toEqual("There's a rental in progress for user!");
      expect(rentalsRepository.findOpenRentalByCar).toHaveBeenCalledTimes(1);
      expect(rentalsRepository.findOpenRentalByCar).toHaveBeenCalledWith(
        "any_car_id"
      );
      expect(rentalsRepository.findOpenRentalByUser).toHaveBeenCalledTimes(1);
      expect(rentalsRepository.findOpenRentalByUser).toHaveBeenCalledWith(
        "any_user_id"
      );
    }
  });

  it("shoud not be able to create a new rental with expectedReturnDate minus 24 hours", async () => {
    try {
      await sut.execute({
        user_id: "any_user_id",
        car_id: "any_car_id",
        expected_return_date: new Date(),
      });
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
      expect(e.message).toEqual("Invalid return date!");
      expect(rentalsRepository.findOpenRentalByCar).toHaveBeenCalledTimes(1);
      expect(rentalsRepository.findOpenRentalByCar).toHaveBeenCalledWith(
        "any_car_id"
      );
      expect(rentalsRepository.findOpenRentalByUser).toHaveBeenCalledTimes(1);
      expect(rentalsRepository.findOpenRentalByUser).toHaveBeenCalledWith(
        "any_user_id"
      );
    }
  });
});
