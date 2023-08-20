import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception.response != null ? exception.response.message : exception.message;

        let responseObject = {
            data: null,
            meta: {
                serverTime: new Date().toISOString(),
                statusCode: status,
                message: message,
            },
        };

        if (status == HttpStatus.INTERNAL_SERVER_ERROR) {
            Object.assign(responseObject.meta, {
                stackTrace: exception.stack,
            });
        }

        response.status(status).json(responseObject);

        console.log(exception)
    }
}
