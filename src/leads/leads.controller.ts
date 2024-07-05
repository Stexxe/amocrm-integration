import { Controller, Get, Query } from '@nestjs/common';
import { AmocrmLeadsService } from './amocrm-leads.service';
import { Lead } from '../interfaces/lead.interface';

@Controller('api')
export class LeadsController {
  private leadsService: AmocrmLeadsService;
  constructor(leadsService: AmocrmLeadsService) {
    this.leadsService = leadsService;
  }
  @Get('leads')
  async getAll(
    @Query('query') query: string,
  ): Promise<Lead[] | { error: any }> {
    try {
      return await this.leadsService.getLeads(query);
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}
