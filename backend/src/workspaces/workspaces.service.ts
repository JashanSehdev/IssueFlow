import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto.js';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity.js';
import { DataSource, EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { WorkspaceMember } from '../workspace_members/entities/workspace_member.entity.js';
import { MemberRole } from '../workspace_members/enum/member-role.enum.js';
import { failedResponse, successResponse } from '../common/utils/responses.js';
import { IWorkspace } from './interface/workspace.interface.js';
import { FilterWorkspaceDto } from './dto/filter-workspace.sto.js';
import { paginationResponse } from '../common/utils/pagination.js';
import { response } from 'express';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository : Repository<Workspace>,

    private readonly dataSource : DataSource
  ){}
  async create(createWorkspaceDto: CreateWorkspaceDto, userId : number) {
    const savedWorkspace = await this.dataSource.transaction(async (manager : EntityManager) => {
      const workspace = this.workspaceRepository.create({...createWorkspaceDto, created_by: userId});
      const savedWorkspace = await this.workspaceRepository.save(workspace);

      const memberRepo = await this.dataSource.getRepository(WorkspaceMember);

      const member = memberRepo.create({workspace_id: savedWorkspace.id, user_id: userId, role: MemberRole.ADMIN});

      await memberRepo.save(member);

      return savedWorkspace
    })

    return successResponse("Workspace has been created Successfully", await this.getWorkspace(savedWorkspace.id, userId))

  }

  async getWorkspace (workspaceId : number, userId : number) : Promise<IWorkspace> {
    const memberRepo = this.dataSource.getRepository(WorkspaceMember);
    const member = await memberRepo.findOneBy({
      workspace_id : workspaceId,
      user_id: userId
    })

    if (!member) throw new ForbiddenException(failedResponse(`you can't access this resource`));

    const workspace = await this.workspaceRepository.findOneOrFail({
      where : {
        id: workspaceId
      },
    })



    return {...workspace, total_issues: 0}
  }

  async findAll( filterWorkspaceDto : FilterWorkspaceDto , userId : number) {
    const page = Number(filterWorkspaceDto.page ?? 1);
    const limit = Number(filterWorkspaceDto.limit ?? 10)
    const skip = (page - 1) * limit;

    const where : FindOptionsWhere<Workspace> = {}


    const [workspaces, total] = await this.workspaceRepository.findAndCount({
      where : {
        ...where,
        Members : {
          user_id : userId
        }
      },

      skip : skip,
      take : limit
    })

    return paginationResponse(workspaces, page, limit, total)

  }

  async findWorkSpace (id : number, userId : number) {
    const ws = await this.getWorkspace(id, userId);

    return successResponse("workspace fetched successfully", ws);
  }

  findOne(id: number) {
    return `This action returns a #${id} workspace`;
  }

  update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    return `This action updates a #${id} workspace`;
  }

  remove(id: number) {
    return `This action removes a #${id} workspace`;
  }
}
