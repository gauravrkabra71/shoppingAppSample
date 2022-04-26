import { Controller, Get, Route } from 'tsoa';

@Route('healthcheck')
export class HealthcheckController extends Controller {
  @Get()
  async healthcheck(): Promise<string> {
    return 'working :)';
  }
}
