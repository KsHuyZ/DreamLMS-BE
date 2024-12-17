import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './database/config/database.config';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './mail/config/mail.config';
import fileConfig from './files/config/file.config';
import certificateConfig from './certificate/config/certificate.config';
import googleConfig from './auth-google/config/google.config';
import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { HeaderResolver } from 'nestjs-i18n';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { AllConfigType } from './config/config.type';
import { SessionModule } from './session/session.module';
import { MailerModule } from './mailer/mailer.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { CronService } from './cron/cron.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { EnrollsModule } from './enrolls/enrolls.module';
import { LessonsModule } from './lessons/lessons.module';
import { TagsModule } from './tags/tag.module';
import { CategoriesModule } from './categories/category.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { VideosModule } from './videos/videos.module';
import { QuizzesModule } from './quizzes/quizzes.module';

import { QuestionsModule } from './questions/questions.module';

import { AnswersModule } from './answers/answers.module';

import { LessonVideosModule } from './lesson-videos/lesson-videos.module';

import { CourseVideosModule } from './course-videos/course-videos.module';
import { PaymentsModule } from './payments/payments.module';
import { StripeModule } from './stripe/stripe.module';

import { UserVideosModule } from './user-videos/user-videos.module';

import { UserQuizzesModule } from './user-quizzes/user-quizzes.module';

import { UserQuizAnswersModule } from './user-quiz-answers/user-quiz-answers.module';
import { CertificateModule } from './certificate/certificate.module';

@Module({
  imports: [
    UserQuizAnswersModule,
    UserQuizzesModule,
    UserVideosModule,
    CourseVideosModule,
    LessonVideosModule,
    AnswersModule,
    QuestionsModule,
    QuizzesModule,
    VideosModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return await addTransactionalDataSource(new DataSource(options));
      },
    }),
    PaymentsModule,
    StripeModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        mailConfig,
        fileConfig,
        googleConfig,
        certificateConfig,
      ],
      envFilePath: ['.env'],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    CertificateModule,
    UsersModule,
    AuthModule,
    AuthGoogleModule,
    SessionModule,
    MailModule,
    MailerModule,
    HomeModule,
    LessonsModule,
    CoursesModule,
    EnrollsModule,
    TagsModule,
    CategoriesModule,
    ScheduleModule.forRoot(),
  ],
  providers: [CronService],
})
export class AppModule {}
