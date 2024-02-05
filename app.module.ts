import { Module } from '@nestjs/common';
import { RequestSenderModule } from './src/request-sender/request-sender.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './src/common/errors-handler/all-exceptions-filter';
import { RedmineModule } from './src/redmine/redmine.module';
import { SlackModule } from './src/slack/slack.module';

@Module({
  imports: [RequestSenderModule, RedmineModule, SlackModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
