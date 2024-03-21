import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body(ValidationPipe) authUserDto: AuthUserDto,
  ): Promise<{ message: string }> {
    return this.authService.signup(authUserDto);
  }

  @Post('login')
  async login(
    @Body(ValidationPipe) authUserDto: AuthUserDto,
  ): Promise<{ access_token: string }> {
    return this.authService.login(authUserDto);
  }
}
