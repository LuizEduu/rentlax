import csvParse from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategories {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path); // stream para fazer leitura do arquivo
      const importCategories: IImportCategories[] = [];

      const parseFile = csvParse(); // lib para auxiliar no parse e leitura do csv

      stream.pipe(parseFile); // pipe faz a leitura dos chunks do file e repassa para o parseFile

      parseFile.on("data", async (line) => {
        const [name, description] = line;

        importCategories.push({
          name,
          description,
        });
      });

      parseFile.on("end", () => {
        resolve(importCategories);
      });

      parseFile.on("error", (err) => {
        reject(err);
      });
    });
  }

  async execute(file: Express.Multer.File): Promise<IImportCategories[]> {
    const categories = await this.loadCategories(file);

    console.log(categories);

    return categories;
  }
}

export { ImportCategoryUseCase };
