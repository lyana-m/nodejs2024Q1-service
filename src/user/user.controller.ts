import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseUUIDPipe,
  ValidationPipe,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ExcludePasswordInterceptor } from './exclude-password.interceptor';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseInterceptors(ExcludePasswordInterceptor)
  async getAllUsers(): Promise<UserDto[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @UseInterceptors(ExcludePasswordInterceptor)
  async getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto> {
    return this.userService.getUserById(id);
  }

  @Post()
  @UseInterceptors(ExcludePasswordInterceptor)
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<UserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @UseInterceptors(ExcludePasswordInterceptor)
  async updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserDto> {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUser(id);
  }
}
