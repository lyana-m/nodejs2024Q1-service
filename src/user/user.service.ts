import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from './dto/user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  convertUserToUserDto(user: User): UserDto {
    return {
      ...user,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    };
  }

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user) => this.convertUserToUserDto(user));
  }

  async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async getUserById(id: string): Promise<UserDto> {
    const user = await this.findUserById(id);

    return this.convertUserToUserDto(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const timestamp = new Date();
    const user = {
      id: uuidv4(),
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
      ...createUserDto,
    };
    const createdUser = await this.prisma.user.create({ data: { ...user } });

    return this.convertUserToUserDto(createdUser);
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserDto> {
    const user = await this.findUserById(id);

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException(`Invalid old password`, HttpStatus.FORBIDDEN);
    }

    if (user.password === updatePasswordDto.newPassword) {
      throw new HttpException(
        `New password and old password are the same`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...user,
        version: ++user.version,
        password: updatePasswordDto.newPassword,
        updatedAt: new Date(),
      },
    });

    return this.convertUserToUserDto(updatedUser);
  }

  async deleteUser(id: string) {
    await this.findUserById(id);

    await this.prisma.user.delete({ where: { id } });
  }
}
