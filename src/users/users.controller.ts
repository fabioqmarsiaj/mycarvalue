import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.service.create(body.email, body.password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.service.findOneBy(parseInt(id));
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.service.find(email);
  }
}
