import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service.js';
import { UserProfileController } from './user-profile.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './entities/user-profile.entity.js';
import { UserModule } from '../users/user.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile]), UserModule],
  controllers: [UserProfileController],
  providers: [UserProfileService],
  
})
export class UserProfileModule {}
