import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user-profile.dto.js';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto.js';
import { UsersService } from '../users/user.service.js';
import { Repository } from 'typeorm';
import { UserProfile } from './entities/user-profile.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { failedResponse, successResponse } from '../common/utils/responses.js';
import { User } from '../users/entities/users.entity.js';
import { Profile } from './interface/profile.interface.js';
import { UserResponse } from '../users/interfaces/user.interface.js';



function mergeProfileData (user: UserResponse, profile : UserProfile) : Profile  {
  return {
    userId : user.id,
    id : profile.id,
    username : user.username,
    avatar : user.avatar,
    email : user.email,
    firstName : profile.first_name,
    lastName  : profile.last_name,
    age : profile.age,
    role : user.role


  }
}

@Injectable()
export class UserProfileService {

  constructor(
    @InjectRepository(UserProfile)
    private readonly profileRepository : Repository<UserProfile>,
    private readonly userService : UsersService
  ) {

  }
  async create(createUserProfileDto: CreateUserProfileDto, userId : number) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new NotFoundException(failedResponse('user not found'))

    const profile = this.profileRepository.create({...createUserProfileDto, user_id : userId});

    const savedProfile = await this.profileRepository.save(profile)
    return successResponse('userProfile has been created successfully', savedProfile);

  }
  async findMe (userId : number) {
    return this.profileRepository.findOneByOrFail({user_id : userId});
  }

  async findOne(id: number) {
    return await  this.profileRepository.findOneBy({id})
  }

  async findProfile ( id : number ) {
    const user =  await this.userService.findOne(id);
    if (!user) throw new NotFoundException(failedResponse('user not found'));

    const profile =  await this.findOne(id);

    if (!profile) {
      return successResponse(`profile with id : ${id} retrieved successfully`, user)
    }
    return successResponse(`profile with id : ${id} retrieved successfully`, mergeProfileData(user, profile))

  }

  async update(id: number, updateUserProfileDto: UpdateUserProfileDto, userId : number) {
    const profile = await this.findOne(id);
    
    if (!profile) throw new NotFoundException(failedResponse('profile not found'));

    if (profile.user_id !== userId) {
      throw new ForbiddenException(failedResponse('You are not have access to this resource'))
    }

    const updatedProfile = Object.assign(profile, updateUserProfileDto);

    const update = await this.profileRepository.update(id, updatedProfile);

    if (update.affected !== 1) throw new InternalServerErrorException(failedResponse('unable to update this profile'));

    return successResponse("Profile Updated Successfully",updatedProfile)
  }

  remove(id: number) {
    return `This action removes a #${id} userProfile`;
  }
}
