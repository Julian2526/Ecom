import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  // 🔥 REGISTRO
  async register(user: any) {
    const exists = await this.userModel.findOne({
      email: user.email,
    });

    if (exists) {
      return { error: 'Usuario ya existe' };
    }

    const newUser = new this.userModel(user);
    await newUser.save();

    return { message: 'Usuario registrado' };
  }

  // 🔥 LOGIN REAL
  async login(user: any) {
    const found = await this.userModel.findOne({
      email: user.email,
      password: user.password,
    });

    if (!found) {
      return { error: 'Credenciales incorrectas' };
    }

    return { message: 'Login exitoso', user: found };
  }
}