import { Inject, Injectable } from '@nestjs/common';
import { IRedmineService, IRedmineTimeLog, IRedmineTimeLogApiResponse } from './contracts/i.redmine.service';
import { IRequestPayload, IRequestSenderService } from '../../request-sender/domain/contracts/i.request-sender.service';

@Injectable()
export class RedmineService implements IRedmineService {
  private readonly redmineUrl: string;
  private readonly redmineApiKeysMap;

  constructor(@Inject('RequestSenderService') private requestSenderService: IRequestSenderService) {
    this.redmineUrl = process.env.REDMINE_URL;
    if (!this.redmineApiKeysMap) {
      this.redmineApiKeysMap = new Map();
    }
  }

  async getTimeEntriesPerDate(date: string, redmineApiKey: string): Promise<Array<IRedmineTimeLog>> {
    const requestPayload: IRequestPayload = {
      method: 'get',
      url: `${this.redmineUrl}/time_entries.json?user_id=me&spent_on=${date}`,
      headers: {
        'X-Redmine-API-Key': redmineApiKey,
        'Content-Type': 'application/json',
      },
    };
    const response = await this.requestSenderService.send<IRedmineTimeLogApiResponse>(requestPayload);
    return response.time_entries.map((timeLog) => {
      return {
        projectName: timeLog.project.name,
        hours: timeLog.hours,
        activity: timeLog.activity.name,
        comments: timeLog.comments,
      };
    });
  }

  setRedmineApiKey(payload): void {
    this.redmineApiKeysMap.set(payload.slackId, payload.redmineApiKey);
  }

  deleteRedmineApiKey(slackId: string): void {
    this.redmineApiKeysMap.delete(slackId);
  }

  getRedmineApiKey(slackId?: string): string | Map<string, string> {
    if (slackId) {
      return this.redmineApiKeysMap.get(slackId);
    } else {
      return this.redmineApiKeysMap;
    }
  }
}
