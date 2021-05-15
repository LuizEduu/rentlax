import { Specification } from "../../model/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "./ISpecificationRepository";

class SpecificationRepositoryImpl implements ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): Specification {
    throw new Error("Method not implemented.");
  }
  findByName(name: string): Specification {
    throw new Error("Method not implemented.");
  }
}

export { SpecificationRepositoryImpl };
