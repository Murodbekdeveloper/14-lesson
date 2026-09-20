import { Controller, Get, SetMetadata, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

@Controller()
// @UseInterceptors(TransformInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('home')
  // @SetMetadata('isFreeResponse', true)
  getHome() {
    return 'Hi guys'
  }
}
