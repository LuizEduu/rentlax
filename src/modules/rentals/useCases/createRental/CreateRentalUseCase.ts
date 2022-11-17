import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(
    private readonly rentalsRepository: IRentalsRepository,
    private readonly dateProvider: IDateProvider
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const rentalOpenToCar = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (rentalOpenToCar) {
      throw new AppError("Car is unavailable");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!");
    }

    const dateNow = this.dateProvider.dateNow();

    const compareDate = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compareDate < 24) {
      throw new AppError("Invalid return date!");
    }

    return this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });
  }
}

export { CreateRentalUseCase };
