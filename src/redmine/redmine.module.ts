import { forwardRef, Module } from '@nestjs/common';
import { RedmineController } from './http/controllers/redmine.controller';
import { RedmineService } from './domain/redmine.service';
import { RequestSenderModule } from '../request-sender/request-sender.module';
import { RedmineCron } from './cron/redmine.cron';
import { SlackModule } from '../slack/slack.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [RequestSenderModule, forwardRef(() => SlackModule), ScheduleModule.forRoot()],
  controllers: [RedmineController],
  providers: [RedmineService, RedmineCron],
  exports: [RedmineService],
})
export class RedmineModule {}
