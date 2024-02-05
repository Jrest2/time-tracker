import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IRequestSenderService } from './contracts/i.request-sender.service';

@Injectable()
export class RequestSenderService implements IRequestSenderService {
  constructor() {}

  async send<T>(payload): Promise<T> {
    const requestPayload = {
      method: payload.method,
      url: payload.url,
      headers: payload.headers,
      params: payload.params,
    };
    const response = await axios.request(requestPayload);
    return response.data;
  }
}
