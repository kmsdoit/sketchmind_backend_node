import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1673935470341 implements MigrationInterface {
    name = 'addedEntity1673935470341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "relationship" character varying NOT NULL, "name" character varying NOT NULL, "birth" character varying NOT NULL, "sex" character varying NOT NULL, "educational" character varying NOT NULL, "educational_status" character varying NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "occupation" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
    }

}
