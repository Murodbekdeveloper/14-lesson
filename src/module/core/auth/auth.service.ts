import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}
  async register(registerAuthDto: RegisterAuthDto) {
    // const findUser = await this.prismaService.user.findFirst({
    //   where: { username: registerAuthDto.username },
    // });
    // if (findUser) {
    //   throw new ConflictException('Username already exists');
    // }
    // const hashedPassword = await bcrypt.hash(registerAuthDto.password, 10);
    // if (hashedPassword) {
    //   throw new Error('Token destroy');
    // }
    // const createUser = await this.prismaService.user.create({
    //   data: {
    //     username: registerAuthDto.username,
    //     password: hashedPassword,
    //   },
    // });
    // const token = await this.jwtService.signAsync({ user_id: createUser.id });
    // return {
    //   access_token: token,
    //   username: createUser.username,
    // };
    const findUser = await this.prismaService.user.findFirst({
      where: {
        username: registerAuthDto.username,
      }
    });
  }
  async login(loginAuthDto: LoginAuthDto) {
    // const findUser = await this.prismaService.user.findFirst({
    //   where: { username: loginAuthDto.username },
    // });
    // if (!findUser) {
    //   throw new UnauthorizedException('Username or password incorrect');
    // }
    // const comparePassword = await bcrypt.compare(
    //   loginAuthDto.password,
    //   findUser.password
    // );
    // const token = await this.jwtService.signAsync({ user_id: findUser.id });
    // return token;
    const findUser = await this.prismaService.user.findFirst({
      where: { username: loginAuthDto.username },
    });
    if (!findUser) {
      throw new UnauthorizedException('Username or password incorrect');
    }
    const comparePassword = await bcrypt.compare(
      loginAuthDto.password,
      findUser.password,
    )
    const token = await this.jwtService.signAsync({user_id: findUser.id});
    return {
      access_token: token,
      id: findUser.id,
      username: findUser.username,
      password: findUser.password,
      role: findUser.role
    }
  }
}
