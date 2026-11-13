import { Module } from '@nestjs/common';
import { WorkspaceMembersService } from './workspace_members.service.js';
import { WorkspaceMembersController } from './workspace_members.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceMember } from './entities/workspace_member.entity.js';

@Module({
  imports:[TypeOrmModule.forFeature([WorkspaceMember])],
  controllers: [WorkspaceMembersController],
  providers: [WorkspaceMembersService],
})
export class WorkspaceMembersModule {}
