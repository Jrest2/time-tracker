import { Controller, Get, Inject } from '@nestjs/common';
import { RedmineService } from '../../domain/redmine.service';

@Controller('/redmine')
export class RedmineController {
  constructor(@Inject('RedmineService') private redmineService: RedmineService) {}

  @Get('/time-entries')
  async getTimeEntries() {
    // const date = moment.utc().format('YYYY-MM-DD');
    // return this.redmineService.getTimeEntriesPerDate(date, );
  }
}
