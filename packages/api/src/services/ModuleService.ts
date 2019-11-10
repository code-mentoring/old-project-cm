import { Module } from '../models/Module';
import { BaseService } from './BaseService';

export interface CreateModule {
  name: string;
  description: string;
}

export interface UpdateModule extends CreateModule {
  id: string;
}
export interface GetModule {
  id: string;
}

export const ModuleService = new class extends BaseService<
  Module,
  CreateModule,
  UpdateModule,
  GetModule
  > { }(Module);
