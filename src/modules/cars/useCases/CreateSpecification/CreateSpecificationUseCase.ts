import { Specification } from "../../entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../../repositories/ISpecificationsRepository";

class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}
  execute({ name, description }: ICreateSpecificationDTO): Specification {
    const specificationAlreadyExists =
      this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification Exists!");
    }

    const specification = {
      name,
      description,
      created_at: new Date(),
    };

    this.specificationRepository.create(specification);

    return specification;
  }
}

export { CreateSpecificationUseCase };
