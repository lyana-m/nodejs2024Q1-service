import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from './dto/auth-user.dto';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup({ login, password }: AuthUserDto) {
    const existedUser = await this.userService.getUserByLogin(login);

    if (existedUser) {
      throw new HttpException(
        `User ${login} already exists`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.CRYPT_SALT) || 6,
    );

    this.userService.createUser({
      password: hashedPassword,
      login,
    });

    return { message: `User ${login} successfully signed up` };
  }

  async login({ login, password }: AuthUserDto) {
    const user = await this.userService.getUserByLogin(login);

    if (!user) {
      throw new HttpException(
        `User ${login} does not exist`,
        HttpStatus.FORBIDDEN,
      );
    }

    try {
      const isPasswordValid = await this.comparePasswords(
        password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new HttpException(`Wrong password`, HttpStatus.FORBIDDEN);
      }

      return {
        access_token: await this.generateToken(user),
      };
    } catch {
      throw new HttpException(
        `Internal server error`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  comparePasswords(password: string, hash: string) {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(password, hash, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  async generateToken(user: UserDto) {
    const payload = { userId: user.id, login: user.login };

    return await this.jwtService.signAsync(payload);
  }
}
