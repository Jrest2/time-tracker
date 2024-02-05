import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Constants } from '../../../common/constants/constants';
import { IRedmineService } from '../../../redmine/domain/contracts/i.redmine.service';

@Controller('/slack')
export class SlackController {
  constructor(@Inject('RedmineService') private redmineService: IRedmineService) {}

  @Post('/start')
  async startMessage() {
    const subscribeCommandExample = '`/subscribe [redmine api key]`';
    const getTimeLogsCommandExample = '`/get-loggedTime [date]`';

    return Constants.startMessage(subscribeCommandExample, getTimeLogsCommandExample);
  }

  @Post('subscribe')
  async subscribe(@Body() body) {
    const payload = {
      slackId: body.user_id,
      redmineApiKey: body.text,
    };
    this.redmineService.setRedmineApiKey(payload);
    return Constants.subscribeMessage();
  }

  @Post('unsubscribe')
  async unsubscribe(@Body() body) {
    const slackId = body.user_id;
    this.redmineService.deleteRedmineApiKey(slackId);

    return Constants.unsubscribeMessage();
  }

  @Post('get-logged-time')
  async getLoggedTime(@Body() body) {
    try {
      const date = body.text;
      const redmineApiKey = this.redmineService.getRedmineApiKey(body.user_id);
      const loggedTimeArray = await this.redmineService.getTimeEntriesPerDate(date, redmineApiKey as string);
      let preparedLoggedTimeMessage = ``;
      for (const loggedTime of loggedTimeArray) {
        preparedLoggedTimeMessage += `
        
Project name: ${loggedTime.projectName}\n
Hours: ${loggedTime.hours}\n
Activity: ${loggedTime.activity}\n
Comments: ${loggedTime.comments}\n
        `;
      }
      return preparedLoggedTimeMessage;
    } catch (e) {
      console.log(e);
    }
  }
}
