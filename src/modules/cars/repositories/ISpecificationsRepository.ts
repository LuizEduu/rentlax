import { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Specification;
  findByName(name: string): Specification;
  list(): Specification[];
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
