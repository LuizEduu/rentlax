import { getRepository, Repository } from "typeorm";

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";

import { Specification } from "../entities/Specification";

class SpecificationsRepositoryImpl implements ISpecificationsRepository {
  private specificationsRepository: Repository<Specification>;

  constructor() {
    this.specificationsRepository = getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.specificationsRepository.create({
      name,
      description,
    });

    await this.specificationsRepository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.specificationsRepository.findOne({ name });

    return specification;
  }

  async list(): Promise<Specification[]> {
    return this.specificationsRepository.find();
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.specificationsRepository.findByIds(ids);

    return specifications;
  }
}

export { SpecificationsRepositoryImpl };
