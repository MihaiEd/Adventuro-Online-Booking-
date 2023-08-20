import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './security/filter/AllExceptionsFilter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        }
    });

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new AllExceptionsFilter());

    app.setGlobalPrefix("api")

    const options = new DocumentBuilder()
        .addSecurity('bearer', {
            type: 'http',
            scheme: 'bearer',
        })
        .setTitle('Starter NestJS API')
        .setDescription('Starter NestJS API')
        .setVersion('0.0.1')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}

bootstrap();
