import { Module } from '@nestjs/common';
import { RequestSenderService } from './domain/request-sender.service';

@Module({
  imports: [],
  providers: [RequestSenderService],
  exports: [RequestSenderService],
})
export class RequestSenderModule {}
