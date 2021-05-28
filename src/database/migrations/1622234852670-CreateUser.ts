import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1622234852670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },

          {
            name: "name",
            type: "varchar",
          },

          {
            name: "username",
            type: "varchar",
            isUnique: true,
          },

          {
            name: "password",
            type: "varchar",
          },

          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },

          {
            name: "driver_license",
            type: "varchar",
            isUnique: true,
          },

          {
            name: "admin",
            type: "boolean",
          },

          {
            name: "created__at",
            type: "timestamp",
            default: "now()",
          },

          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
