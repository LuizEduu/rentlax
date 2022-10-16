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
    specifications,
  }: ICreateCarsDTO): Promise<Car>;

  findByLicensePlate(license_plate: string): Promise<Car>;

  listAvailable(
    category_id?: string,
    name?: string,
    brand?: string
  ): Promise<Car[]>;

  findById(id: string): Promise<Car>;
}

export { ICarsRepository };
