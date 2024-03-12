import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.service.create(body.email, body.password);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.service.findOneBy(parseInt(id));

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.service.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.service.update(parseInt(id), body);
  }
}
