import { Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api';
import { ISlackService } from './contracts/i.slack.service';

@Injectable()
export class SlackService implements ISlackService {
  web: WebClient;
  token: string;
  constructor() {
    if (!this.web) {
      this.token = process.env.SLACK_SECRET;
      this.web = new WebClient(this.token);
    }
  }

  async sendMessageToSlackUser(slackId, message) {
    await this.web.chat.postMessage({ channel: slackId, text: message });
  }
}
