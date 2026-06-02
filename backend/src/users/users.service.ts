import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) { }

  async register(registerUserDto: RegisterUserDto) {
    const exists = await this.userModel.findOne({ email: registerUserDto.email });
    if (exists) throw new ConflictException('Usuario ya existe');

    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    await this.userModel.create({
      email: registerUserDto.email,
      password: hashedPassword,
    });

    return { message: 'Usuario registrado' };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({ email: loginUserDto.email });
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    const isHashedPassword = user.password.startsWith('$2');
    const passwordMatches = isHashedPassword
      ? await bcrypt.compare(loginUserDto.password, user.password)
      : loginUserDto.password === user.password;

    if (!passwordMatches) throw new UnauthorizedException('Credenciales incorrectas');

    const { password, ...cleanUser } = user.toObject();

    return { message: 'Login exitoso', user: cleanUser };
  }
}
