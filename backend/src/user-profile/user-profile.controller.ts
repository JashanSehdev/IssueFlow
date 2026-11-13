import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserProfileService } from './user-profile.service.js';
import { CreateUserProfileDto } from './dto/create-user-profile.dto.js';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto.js';
import { Request } from 'express';

@Controller('users/profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post()
  create(@Body() createUserProfileDto: CreateUserProfileDto, @Req() req : Request & {user : any}) {
    return this.userProfileService.create(createUserProfileDto, req.user.id);
  }

  @Get()
  findMe( @Req() req : Request & {user : any}) {
    return this.userProfileService.findMe(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userProfileService.findProfile(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserProfileDto: UpdateUserProfileDto, @Req() req : Request & {user : any}) {
    return this.userProfileService.update(+id, updateUserProfileDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userProfileService.remove(+id);
  }
}
