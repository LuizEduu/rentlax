import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createSpecificationUseCase: CreateSpecificationUseCase;

describe("Create Specification", () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationsRepositoryInMemory
    );
  });

  it("should be able to create a new Specification", async () => {
    const specification = await createSpecificationUseCase.execute({
      name: "specification Test",
      description: "Description test",
    });

    expect(specification).toHaveProperty("id");
  });

  it("should not be able to create a specification with same name", () => {
    expect(async () => {
      await createSpecificationUseCase.execute({
        name: "specification Test",
        description: "Description test",
      });

      await createSpecificationUseCase.execute({
        name: "specification Test",
        description: "Description test",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
