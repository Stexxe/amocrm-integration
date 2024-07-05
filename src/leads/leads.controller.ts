import { Controller, Get, Query } from '@nestjs/common';
import { AmocrmLeadsService } from './amocrm-leads.service';
import { PipelineService } from '../pipeline/pipeline.service';
import { ApiResult } from '../interfaces/apiresult.interface';
import { UserService } from '../user/user.service';

@Controller('api')
export class LeadsController {
  constructor(
    private leadsService: AmocrmLeadsService,
    private pipelineService: PipelineService,
    private userService: UserService,
  ) {}
  @Get('leads')
  async getAll(
    @Query('query') query: string,
  ): Promise<ApiResult | { error: string }> {
    try {
      const leads = await this.leadsService.getLeads(query);
      const pipelineIds = new Set<number>();
      const usersIds = new Set<number>();
      for (const lead of leads) {
        pipelineIds.add(lead.pipelineId);
        usersIds.add(lead.responsibleUserId);
      }

      const statuses = {};
      for (const id of pipelineIds) {
        for (const status of await this.pipelineService.getStatuses(id)) {
          statuses[status.id] = { name: status.name };
        }
      }

      const users = {};
      for (const id of usersIds) {
        const user = await this.userService.getUser(id);
        users[user.id] = { name: user.name };
      }

      const formatDt = (d: Date) =>
        `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;

      return leads.map((lead) => ({
        id: lead.id,
        name: lead.name,
        price: lead.price,
        status: statuses[lead.statusId],
        responsibleUser: users[lead.responsibleUserId],
        createdAt: formatDt(new Date(lead.createdAt * 1000)),
      }));
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}
