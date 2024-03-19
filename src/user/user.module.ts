import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ExcludePasswordInterceptor } from './exclude-password.interceptor';

@Module({
  controllers: [UserController],
  providers: [UserService, ExcludePasswordInterceptor],
})
export class UserModule {}
