import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((user) => {
            if (user.password) {
              return { ...user, password: undefined };
            }
            return user;
          });
        } else {
          if (data.password) {
            return { ...data, password: undefined };
          }
          return data;
        }
      }),
    );
  }
}
