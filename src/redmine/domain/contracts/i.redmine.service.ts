export interface IRedmineTimeLogApiEntity {
  project: {
    name: string;
  };
  hours: number;
  activity: {
    name: string;
  };
  comments: string;
}

export interface IRedmineTimeLog {
  projectName: string;
  hours: number;
  activity: string;
  comments: string;
}

export interface IRedmineTimeLogApiResponse {
  time_entries: Array<IRedmineTimeLogApiEntity>;
}

export interface IRedmineService {
  getTimeEntriesPerDate(date: string, redmineApiKey: string): Promise<Array<IRedmineTimeLog>>;

  setRedmineApiKey(payload: { slackId: string; redmineApiKey: string });

  deleteRedmineApiKey(slackId: string): void;

  getRedmineApiKey(slackId?: string): string | Map<string, string>;
}
