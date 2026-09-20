import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return { key: 'hi', date: 'now', number: 1 };
  }
}