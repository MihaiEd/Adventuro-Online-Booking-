import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HelloWorldService } from '../service/helloWorld.service';

@Controller("hello-world")
@ApiTags('Hello World')
export class HelloWorldController {
    constructor(
        private readonly appService: HelloWorldService
    ) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
