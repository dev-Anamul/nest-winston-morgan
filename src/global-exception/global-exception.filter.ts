import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  PayloadTooLargeException,
} from '@nestjs/common';
import { IApiResponse } from 'src/interface/api-response';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name, {
    timestamp: true,
  });

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Log the exception for debugging
    this.logger.error('An error occurred', exception, exception['stack']);

    // default status code and message
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = { message: 'Internal server error' };

    // handle Handle specific exceptions
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      message =
        errorResponse instanceof Object
          ? errorResponse
          : { message: errorResponse };

      // handle throttle exception error
    } else if (exception instanceof PayloadTooLargeException) {
      status = HttpStatus.PAYLOAD_TOO_LARGE;
      message = 'Payload too large, please reduce the size of your data';

      // handler multer error
    } else if (exception['code'] === 11000) {
      status = HttpStatus.CONFLICT;
      message = {
        message: `Duplicate key error: A record with the same unique field already exists key : ${JSON.stringify(exception?.['keyValue'])}`,
      };
    }

    // mongoose validation error
    else if (exception?.['name'] === 'ValidationError') {
      status = HttpStatus.BAD_REQUEST;
      message = {
        message: exception['message'] || 'Validation error occurred',
      };

      // mongo cast error
    } else if (exception['name'] === 'CastError') {
      status = HttpStatus.BAD_REQUEST;
      message = { message: `Invalid value for ${exception?.['path']}` };

      // mongo network error
    } else if (exception['name'] === 'MongoNetworkError') {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = { message: 'Database connection error' };

      // mongo server selection error
    } else if (exception['name'] === 'MongoServerSelectionError') {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = { message: 'Database is temporarily unavailable.' };

      // mongo write conflict error
    } else if (exception['message']?.includes('WriteConflict')) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = { message: 'Write conflict detected, please retry' };
    }

    // Construct the response
    const errorResponse: IApiResponse<null> = {
      status: false,
      path: request?.url,
      statusCode: status,
      ...(message || {}),
      data: null,
      timestamp: Date.now,
    };

    // error response
    response.status(status).json(errorResponse);
  }
}
