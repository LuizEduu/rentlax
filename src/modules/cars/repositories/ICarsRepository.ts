import { ICreateCarsDTO } from "../dtos/ICreateCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarsDTO): Promise<Car>;

  findByLicensePlate(license_plate: string): Promise<Car>;
}

export { ICarsRepository };
