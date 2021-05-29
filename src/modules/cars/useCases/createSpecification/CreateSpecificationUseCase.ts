import { inject, injectable } from "tsyringe";

import { Specification } from "../../entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../../repositories/ISpecificationsRepository";

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepositoryImpl")
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification | Error> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification Exists!");
    }

    const specification = {
      name,
      description,
    };

    const savedSpecification = await this.specificationRepository.create(
      specification
    );

    return savedSpecification;
  }
}

export { CreateSpecificationUseCase };
