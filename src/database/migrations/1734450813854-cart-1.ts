import { MigrationInterface, QueryRunner } from 'typeorm';

export class Cart11734450813854 implements MigrationInterface {
  name = 'Cart11734450813854';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "enrolls" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "haveCertificate" boolean NOT NULL DEFAULT false, "userId" uuid, "courseId" uuid, CONSTRAINT "PK_7a7325dbacb685b7d0e81d38545" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "video" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "videoId" character varying NOT NULL, "duration" integer NOT NULL, "size" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdById" uuid, CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "isCorrect" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "questionId" uuid, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "quizId" uuid, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "quiz" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "order" integer NOT NULL, "time" integer NOT NULL, "disabled" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "lessonId" uuid, CONSTRAINT "PK_422d974e7217414e029b3e641d0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lessons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "order" integer NOT NULL, "description" character varying NOT NULL, "disabled" boolean NOT NULL DEFAULT false, "courseId" uuid, CONSTRAINT "PK_9b9a8d455cac672d262d7275730" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lesson_video" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "order" integer NOT NULL, "isFree" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "videoId" uuid, "lessonId" uuid, CONSTRAINT "REL_8c4dfd959ed78b63551b09bcae" UNIQUE ("videoId"), CONSTRAINT "PK_ddfb00dc35a3c857190a78797a1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_video" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "videoId" uuid, CONSTRAINT "PK_24c7490a61628f17ddaae1736cd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'TEACHER', 'STUDENT')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'BLOCK')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "socialId" character varying, "firstName" character varying, "lastName" character varying, "photo" character varying, "role" "public"."users_role_enum" NOT NULL DEFAULT 'STUDENT', "status" "public"."users_status_enum" NOT NULL DEFAULT 'INACTIVE', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "facebook" character varying, "instagram" character varying, "github" character varying, "x" character varying, "description" character varying, "banner" character varying, "walletAddress" character varying, "totalStorage" integer NOT NULL DEFAULT '1', "unit" character varying NOT NULL DEFAULT 'gb', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2025eaefc4e1b443c84f6ca9b2" ON "users" ("socialId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5372672fbfd1677205e0ce3ece" ON "users" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_af99afb7cf88ce20aff6977e68" ON "users" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "url" character varying NOT NULL, "publicId" character varying NOT NULL, "format" character varying NOT NULL, "size" double precision NOT NULL, "createdById" uuid, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "course_video" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "videoId" uuid, CONSTRAINT "REL_44ef389a626b13ba04ffb806c3" UNIQUE ("videoId"), CONSTRAINT "PK_01bf48188bdc66897dbaacb5e66" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "price" integer NOT NULL, "description" character varying NOT NULL, "shortDescription" character varying NOT NULL, "level" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'draft', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "imageId" uuid, "createdById" uuid NOT NULL, "courseVideoId" uuid, CONSTRAINT "REL_4aff0cf92949523f66998843ff" UNIQUE ("imageId"), CONSTRAINT "REL_34b222afb580d71e0ab116e99e" UNIQUE ("courseVideoId"), CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_quiz" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "score" numeric(5,2) NOT NULL, "isCompleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "quizId" uuid, CONSTRAINT "PK_9fdb0b0acc452e256cbfb7f9040" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_quiz_answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userQuizId" uuid, "questionId" uuid, "answerId" uuid, CONSTRAINT "PK_02d71dd680ca8ff98dbda969ec1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "related-course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "courseId" character varying NOT NULL, "relatedCourseId" uuid, CONSTRAINT "PK_757d473bccc36dbeb346ceb42e1" PRIMARY KEY ("id", "courseId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cart_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "cartId" uuid, CONSTRAINT "PK_bd94725aa84f8cf37632bcde997" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "REL_756f53ab9466eb52a52619ee01" UNIQUE ("userId"), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "courses_related_courses" ("coursesId_1" uuid NOT NULL, "coursesId_2" uuid NOT NULL, CONSTRAINT "PK_b184474f2172b047e318faa7241" PRIMARY KEY ("coursesId_1", "coursesId_2"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f79e093192324382f24b86243c" ON "courses_related_courses" ("coursesId_1") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bfbaf9cfb7b1b73303b8e00e41" ON "courses_related_courses" ("coursesId_2") `,
    );
    await queryRunner.query(
      `CREATE TABLE "courseTag" ("courseId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_14b1d2e08d0fa9bfa18dbf105ea" PRIMARY KEY ("courseId", "tagId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_22d4bee635c0378358f6aace2d" ON "courseTag" ("courseId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8c23856780028ee2c41180a563" ON "courseTag" ("tagId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "courseCategory" ("courseId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_86bcf363292e54f79bd6ae32cba" PRIMARY KEY ("courseId", "categoryId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_21fd46cb306a27934402e054b6" ON "courseCategory" ("courseId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_aa002acc00580375ce06536ed3" ON "courseCategory" ("categoryId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "enrolls" ADD CONSTRAINT "FK_b9da85cd066539a66000037a759" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrolls" ADD CONSTRAINT "FK_8a6f3325ea62dfa34bfcede4113" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_13d000ea83a238758ffc62f2c94" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_4959a4225f25d923111e54c7cd2" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quiz" ADD CONSTRAINT "FK_681441d1bf004fc97e473a3bbbb" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lessons" ADD CONSTRAINT "FK_1a9ff2409a84c76560ae8a92590" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_video" ADD CONSTRAINT "FK_8c4dfd959ed78b63551b09bcae1" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_video" ADD CONSTRAINT "FK_ab7797b24495f7baea03e33cbec" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_video" ADD CONSTRAINT "FK_45168e8fb0a2f45871a5a8ec04e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_video" ADD CONSTRAINT "FK_4680aeb44958b4d5b9e7f6a9b7b" FOREIGN KEY ("videoId") REFERENCES "lesson_video"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "images" ADD CONSTRAINT "FK_e05c1ea20bfd629bd6c7639e934" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_video" ADD CONSTRAINT "FK_44ef389a626b13ba04ffb806c36" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "FK_4aff0cf92949523f66998843ff3" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "FK_3fff66ead8c0964a1805eb194b3" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "FK_34b222afb580d71e0ab116e99ef" FOREIGN KEY ("courseVideoId") REFERENCES "course_video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz" ADD CONSTRAINT "FK_ac373cc6866e0323192c662cae9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz" ADD CONSTRAINT "FK_3a6c5188a5d0fdc3c55f087cdcc" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz_answer" ADD CONSTRAINT "FK_75f057e6a6e61064434c4d510d7" FOREIGN KEY ("userQuizId") REFERENCES "user_quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz_answer" ADD CONSTRAINT "FK_816bb62d457ef00738806823b49" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz_answer" ADD CONSTRAINT "FK_12ad435972e27f869b3a8b0024b" FOREIGN KEY ("answerId") REFERENCES "answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "related-course" ADD CONSTRAINT "FK_83e034987889e26263d0cca16e3" FOREIGN KEY ("relatedCourseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" ADD CONSTRAINT "FK_29e590514f9941296f3a2440d39" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses_related_courses" ADD CONSTRAINT "FK_f79e093192324382f24b86243c5" FOREIGN KEY ("coursesId_1") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses_related_courses" ADD CONSTRAINT "FK_bfbaf9cfb7b1b73303b8e00e418" FOREIGN KEY ("coursesId_2") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" ADD CONSTRAINT "FK_22d4bee635c0378358f6aace2dc" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" ADD CONSTRAINT "FK_8c23856780028ee2c41180a5639" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" ADD CONSTRAINT "FK_21fd46cb306a27934402e054b6a" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" ADD CONSTRAINT "FK_aa002acc00580375ce06536ed3c" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courseCategory" DROP CONSTRAINT "FK_aa002acc00580375ce06536ed3c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" DROP CONSTRAINT "FK_21fd46cb306a27934402e054b6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" DROP CONSTRAINT "FK_8c23856780028ee2c41180a5639"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" DROP CONSTRAINT "FK_22d4bee635c0378358f6aace2dc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses_related_courses" DROP CONSTRAINT "FK_bfbaf9cfb7b1b73303b8e00e418"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses_related_courses" DROP CONSTRAINT "FK_f79e093192324382f24b86243c5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" DROP CONSTRAINT "FK_29e590514f9941296f3a2440d39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "related-course" DROP CONSTRAINT "FK_83e034987889e26263d0cca16e3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz_answer" DROP CONSTRAINT "FK_12ad435972e27f869b3a8b0024b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz_answer" DROP CONSTRAINT "FK_816bb62d457ef00738806823b49"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz_answer" DROP CONSTRAINT "FK_75f057e6a6e61064434c4d510d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz" DROP CONSTRAINT "FK_3a6c5188a5d0fdc3c55f087cdcc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz" DROP CONSTRAINT "FK_ac373cc6866e0323192c662cae9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "FK_34b222afb580d71e0ab116e99ef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "FK_3fff66ead8c0964a1805eb194b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "FK_4aff0cf92949523f66998843ff3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_video" DROP CONSTRAINT "FK_44ef389a626b13ba04ffb806c36"`,
    );
    await queryRunner.query(
      `ALTER TABLE "images" DROP CONSTRAINT "FK_e05c1ea20bfd629bd6c7639e934"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_video" DROP CONSTRAINT "FK_4680aeb44958b4d5b9e7f6a9b7b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_video" DROP CONSTRAINT "FK_45168e8fb0a2f45871a5a8ec04e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_video" DROP CONSTRAINT "FK_ab7797b24495f7baea03e33cbec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_video" DROP CONSTRAINT "FK_8c4dfd959ed78b63551b09bcae1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lessons" DROP CONSTRAINT "FK_1a9ff2409a84c76560ae8a92590"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quiz" DROP CONSTRAINT "FK_681441d1bf004fc97e473a3bbbb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_4959a4225f25d923111e54c7cd2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer" DROP CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" DROP CONSTRAINT "FK_13d000ea83a238758ffc62f2c94"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrolls" DROP CONSTRAINT "FK_8a6f3325ea62dfa34bfcede4113"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrolls" DROP CONSTRAINT "FK_b9da85cd066539a66000037a759"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_aa002acc00580375ce06536ed3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_21fd46cb306a27934402e054b6"`,
    );
    await queryRunner.query(`DROP TABLE "courseCategory"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8c23856780028ee2c41180a563"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_22d4bee635c0378358f6aace2d"`,
    );
    await queryRunner.query(`DROP TABLE "courseTag"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bfbaf9cfb7b1b73303b8e00e41"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f79e093192324382f24b86243c"`,
    );
    await queryRunner.query(`DROP TABLE "courses_related_courses"`);
    await queryRunner.query(`DROP TABLE "cart"`);
    await queryRunner.query(`DROP TABLE "cart_item"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "related-course"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(`DROP TABLE "user_quiz_answer"`);
    await queryRunner.query(`DROP TABLE "user_quiz"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`DROP TABLE "courses"`);
    await queryRunner.query(`DROP TABLE "course_video"`);
    await queryRunner.query(`DROP TABLE "images"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_af99afb7cf88ce20aff6977e68"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5372672fbfd1677205e0ce3ece"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2025eaefc4e1b443c84f6ca9b2"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "user_video"`);
    await queryRunner.query(`DROP TABLE "lesson_video"`);
    await queryRunner.query(`DROP TABLE "lessons"`);
    await queryRunner.query(`DROP TABLE "quiz"`);
    await queryRunner.query(`DROP TABLE "question"`);
    await queryRunner.query(`DROP TABLE "answer"`);
    await queryRunner.query(`DROP TABLE "video"`);
    await queryRunner.query(`DROP TABLE "enrolls"`);
  }
}
