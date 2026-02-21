import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import * as bcryptjs from "bcryptjs";
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async register(registerDto: RegisterDto) {

    return await this.userService.createUser(registerDto);
  }

  async login(loginDto: LoginDto) {

    const user = await this.userService.findOneByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException("email or password is wrong")
    }

    const isPassWordValid = await bcryptjs.compare(loginDto.password, user.password);

    if (!isPassWordValid) {
      throw new UnauthorizedException("email or password is wrong");
    }

    const payload = { email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email: user.email
    };

  }


}
