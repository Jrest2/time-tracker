export interface ISlackService {
  sendMessageToSlackUser(slackId: string, message: string): Promise<void>;
}
