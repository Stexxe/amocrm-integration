import { Controller, Get, Query } from '@nestjs/common';
import { AmocrmLeadsService } from './amocrm-leads.service';
import { Lead } from '../interfaces/lead.interface';
import { PipelineService } from '../pipeline/pipeline.service';
import { ApiResult } from '../interfaces/apiresult.interface';

@Controller('api')
export class LeadsController {
  constructor(
    private leadsService: AmocrmLeadsService,
    private pipelineService: PipelineService,
  ) {}
  @Get('leads')
  async getAll(
    @Query('query') query: string,
  ): Promise<ApiResult | { error: any }> {
    try {
      const leads = await this.leadsService.getLeads(query);
      const pipelineIds = new Set<number>();
      for (const lead of leads) {
        pipelineIds.add(lead.pipelineId);
      }

      const statuses = {};
      for (const id of pipelineIds) {
        for (const status of await this.pipelineService.getStatuses(id)) {
          statuses[status.id] = { name: status.name };
        }
      }

      return leads.map((lead) => ({
        id: lead.id,
        name: lead.name,
        price: lead.price,
        status: statuses[lead.statusId],
      }));
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}
