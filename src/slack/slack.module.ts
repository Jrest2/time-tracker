import { forwardRef, Module } from '@nestjs/common';
import { SlackController } from './http/controllers/slack.controller';
import { SlackService } from './domain/slack.service';
import { RedmineModule } from '../redmine/redmine.module';

@Module({
  imports: [forwardRef(() => RedmineModule)],
  controllers: [SlackController],
  providers: [SlackService],
  exports: [SlackService],
})
export class SlackModule {}
