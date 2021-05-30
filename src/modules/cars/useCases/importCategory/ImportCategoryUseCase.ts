import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategories {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepositoryImpl")
    private categoriesRepository: ICategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path); // stream para fazer leitura do arquivo

      const importCategories: IImportCategories[] = [];

      const parseFile = csvParse(); // lib para auxiliar no parse e leitura do csv

      stream.pipe(parseFile); // pipe faz a leitura dos chunks do file e repassa para o parseFile

      // ouve o evento se tiver o file tiver conteudo executa a callback
      parseFile
        .on("data", async (line) => {
          const [name, description] = line;

          importCategories.push({
            name,
            description,
          });
        })
        // ouve o evento de quando finalizou a leitura do arquivo e coloca no resolve
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(importCategories);
        })
        // ouve o evento se deu erro na leitura do arquivo e coloca na reject
        .on("error", (err) => {
          reject(err.message);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<IImportCategories[]> {
    if (file.mimetype !== "text/csv") {
      throw new AppError("the file is not of the csv type");
    }

    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const existsCategory = await this.categoriesRepository.findByName(name);

      if (!existsCategory) {
        this.categoriesRepository.create({
          name,
          description,
        });
      }
    });

    return categories;
  }
}

export { ImportCategoryUseCase };
