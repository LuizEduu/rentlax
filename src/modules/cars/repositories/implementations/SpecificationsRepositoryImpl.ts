import { Specification } from "../../model/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepositoryImpl implements ISpecificationsRepository {
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepositoryImpl;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepositoryImpl {
    if (!SpecificationsRepositoryImpl.INSTANCE) {
      SpecificationsRepositoryImpl.INSTANCE =
        new SpecificationsRepositoryImpl();
    }

    return SpecificationsRepositoryImpl.INSTANCE;
  }

  create({ name, description }: ICreateSpecificationDTO): Specification {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);

    return specification;
  }

  findByName(name: string): Specification {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }

  list(): Specification[] {
    return this.specifications;
  }
}

export { SpecificationsRepositoryImpl };
