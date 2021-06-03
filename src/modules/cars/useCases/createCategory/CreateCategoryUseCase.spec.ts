import { AppError } from "../../../../errors/AppError";
import { CreateCategoryRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoriesRepositoryInMemory: CreateCategoryRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CreateCategoryRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = await createCategoryUseCase.execute({
      name: "Category test",
      description: "category description test",
    });

    expect(category).toMatchObject({
      id: category.id,
      name: "Category test",
      description: "category description test",
      created_at: category.created_at,
    });

    expect(category);
  });

  it("should not be able to create a duplicate category", async () => {
    expect(async () => {
      await createCategoryUseCase.execute({
        name: "Category test",
        description: "category description test",
      });

      await createCategoryUseCase.execute({
        name: "Category test",
        description: "category description test",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
