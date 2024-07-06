import { Controller, Get, Query } from '@nestjs/common';
import { AmocrmLeadsService } from './amocrm-leads.service';
import { AmocrmPipelineService } from '../pipeline/amocrm-pipeline.service';
import { ApiResult } from '../interfaces/apiresult.interface';
import { AmocrmUserService } from '../user/amocrm-user.service';
import { AmocrmContactsService } from '../contacts/amocrm-contacts.service';

@Controller('api')
export class LeadsController {
  constructor(
    private leadsService: AmocrmLeadsService,
    private pipelineService: AmocrmPipelineService,
    private userService: AmocrmUserService,
    private contactsService: AmocrmContactsService,
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

      const contacts = await this.contactsService.getContacts(
        leads.map(({ id }) => id),
      );

      return leads.map((lead) => ({
        id: lead.id,
        name: lead.name,
        price: lead.price,
        status: statuses[lead.statusId],
        responsibleUser: users[lead.responsibleUserId],
        createdAt: formatDt(new Date(lead.createdAt * 1000)),
        contacts: contacts[lead.id],
      }));
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}
