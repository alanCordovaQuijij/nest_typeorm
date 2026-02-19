import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async createUser(createUserDto: CreateUserDto) {
    //return 'This action adds a new user';
    const userfound = await this.userRepository.findOne({ where: { username: createUserDto.username } });

    if (userfound) {
      throw new ConflictException('El usuario ya existe')
    }

    const newUser = this.userRepository.create(createUserDto);

    return await this.userRepository.save(newUser);

  }

  getUsers() {
    return this.userRepository.find();
  }

  async gerUser(id: number) {
    const userfound = await this.userRepository.findOne({ where: { id } });

    if (!userfound) {
      throw new NotFoundException('El usuario no existe')
    }

    return userfound
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete({ id });

  }
}
