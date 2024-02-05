import { Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ISlackService } from '../../slack/domain/contracts/i.slack.service';
import { IRedmineService } from '../domain/contracts/i.redmine.service';
import * as moment from 'moment';

export class RedmineCron {
  constructor(
    @Inject('RedmineService') private redmineService: IRedmineService,
    @Inject('SlackService') private slackService: ISlackService,
  ) {}

  @Cron('0 0 10 * * 2-6')
  async checkTimeTracking() {
    try {
      const dayInTheWeek = moment.utc().day();
      if (dayInTheWeek !== 6 && dayInTheWeek !== 7) {
        return;
      }
      const date = moment.utc().subtract(1, 'days').format('YYYY-MM-DD');
      const redmineApiKeys = this.redmineService.getRedmineApiKey();
      if (!redmineApiKeys) {
        return;
      }
      for (const redmineApiKey of redmineApiKeys) {
        const timeTracking = await this.redmineService.getTimeEntriesPerDate(date, redmineApiKey[1]);
        const totalTimeTracked = timeTracking.reduce((accumulator, data) => accumulator + data.hours, 0);
        if (totalTimeTracked < 8) {
          const message = `
Ты за вчера (${date}) списал ${totalTimeTracked} часов, то есть меньше 8. Держу в курсе :)
З.Ы. Напомню, чтобы проверить сколько ты часов списал и в какие тикеты, используй команду /get-logged-time {дата в формате YYYY-MM-DD}
Например /get-logged-time 2021-12-01
'
        `;
          await this.slackService.sendMessageToSlackUser(redmineApiKey[0], message);
        }
      }
    } catch (e) {
      throw e;
    }
  }
}
