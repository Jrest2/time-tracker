export interface IRequestSenderService {
  send<T>(payload: IRequestPayload): Promise<T>;
}

export interface IRequestPayload {
  method: string;
  url: string;
  headers?: unknown;
  params?: unknown;
}
