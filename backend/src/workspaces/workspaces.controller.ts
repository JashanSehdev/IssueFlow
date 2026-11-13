import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service.js';
import { CreateWorkspaceDto } from './dto/create-workspace.dto.js';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto.js';
import { Request } from 'express';
import { FilterWorkspaceDto } from './dto/filter-workspace.sto.js';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  create(@Body() createWorkspaceDto: CreateWorkspaceDto, @Req() req : Request & {user : any}) {
    return this.workspacesService.create(createWorkspaceDto, req.user.id);
  }

  @Get()
  findAll(@Query() filterWorkspaceDto : FilterWorkspaceDto, @Req() req : Request & {user : any}) {
    return this.workspacesService.findAll(filterWorkspaceDto, req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req : Request & {user : any}) {
    return this.workspacesService.findWorkSpace(+id, req.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspacesService.update(+id, updateWorkspaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspacesService.remove(+id);
  }
}
