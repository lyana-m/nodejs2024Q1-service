import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  private users: UserDto[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      login: 'vanya',
      password: '123',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];

  getAllUsers(): UserDto[] {
    return this.users;
  }

  getUserById(id: string): UserDto {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  createUser(user: UserDto) {
    this.users.push(user);

    return user;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.getUserById(id);

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException(`Invalid old password`, HttpStatus.FORBIDDEN);
    }

    if (user.password === updatePasswordDto.newPassword) {
      throw new HttpException(
        `New password and old password are the same`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          version: ++user.version,
          password: updatePasswordDto.newPassword,
          updatedAt: Date.now(),
        };
      }
      return user;
    });

    return this.getUserById(id);
  }

  deleteUser(id: string) {
    this.getUserById(id);

    this.users = this.users.filter((user) => user.id !== id);
  }
}
