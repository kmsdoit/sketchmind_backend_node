import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1673939284101 implements MigrationInterface {
    name = 'addedEntity1673939284101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" RENAME COLUMN "sex" TO "gender"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" RENAME COLUMN "gender" TO "sex"`);
    }

}
