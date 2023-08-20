import { Module } from '@nestjs/common';
import { HelloWorldService } from '../service/helloWorld.service';
import { HelloWorldController } from '../controller/helloWorld.controller';

@Module({
    imports: [],
    controllers: [HelloWorldController],
    providers: [HelloWorldService],
})
export class HelloWorldModule {
}
