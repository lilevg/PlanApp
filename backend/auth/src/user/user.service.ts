import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ProducerService } from '../queues/producer.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import config from 'config';
import {UpdateUserDto} from "./dto/update-user.dto";

export interface JwtPayload {
  email: string;
}

interface JwtConfig {
  secret: string;
  expiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly producerService: ProducerService,
    private jwtService: JwtService,
  ) {}

  public async create(registerUserDto: CreateUserDto) {
    const { email, password } = registerUserDto;
    const candidate = await this.getUsersByEmail(email);
    if (candidate) {
      throw new HttpException(
        'User with this email already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      const user = await this.register({
        ...registerUserDto,
        salt: salt,
        password: hashPassword,
      });
      const token = await this.generateToken(user);
      return { token, user };
    } catch (e) {
      console.error(e);
    }
  }

  public async generateToken(user: User): Promise<{ token: string }> {
    const payload = { email: user.email, id: user.id };
    return { token: this.jwtService.sign(payload) };
  }

  async getAll() {
    return await this.userRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async getUser(id: string) {
    return await this.userRepository.findOneBy({
      id,
    });
  }

  public async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto);
    const accessToken = await this.getAccessToken({
      email: user.email,
    });
    const refreshToken = await this.getRefreshToken({
      email: user.email,
    });

    await this.updateRefreshTokenInUser(refreshToken, user.email);
    return {
      accessToken,
      refreshToken,
      user: user,
    };
  }

  public async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.getUsersByEmail(loginUserDto.email);

    if (!user) {
      throw new HttpException('This user does`n exist', HttpStatus.BAD_REQUEST);
    }

    const passwordEquals = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }

    throw new HttpException('This user does`n exist', HttpStatus.BAD_REQUEST);
  }

  async getUsersByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async getAccessToken(payload: JwtPayload) {
    // const dbConfig = config.get<JwtConfig>('jwt');
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: +process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });
    return accessToken;
  }

  async getRefreshToken(payload: JwtPayload) {
    // const dbConfig = config.get<JwtConfig>('jwt');
    const refreshToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: +process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });
    return refreshToken;
  }

  async updateRefreshTokenInUser(refreshToken, email) {
    if (refreshToken) {
      refreshToken = await bcrypt.hash(refreshToken, 10);
    }
    await this.updateRefreshToken(email, refreshToken);
  }

  async updateRefreshToken(email: string, refreshToken: string) {
    const user = this.userRepository.update(
      { email: email },
      {
        hashedRefreshToken: refreshToken,
      },
    );
    return user;
  }

  async register(registerUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create({ ...registerUserDto });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return user;
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    // Throw a NotFoundException if the plan is not found
    if (!user) {
      throw new NotFoundException(`Plan with ID ${userId} not found`);
    }

    // Update the plan properties
    // Assuming updatePlanDto has properties like title, start_time, end_time, description, importance, completed
    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }
    if (updateUserDto.surname) {
      user.surname = updateUserDto.surname;
    }
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    return this.userRepository.save(user);
  }

}
