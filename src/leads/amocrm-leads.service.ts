import { Injectable } from '@nestjs/common';
import { Lead } from '../interfaces/lead.interface';
import { AmocrmLeadsResponse } from '../interfaces/amocrm.leads.response.interface';
import { AmocrmFetcherService } from '../amocrm-fetcher/amocrm-fetcher.service';

@Injectable()
export class AmocrmLeadsService {
  constructor(private amocrmService: AmocrmFetcherService) {}

  async getLeads(query: string | undefined): Promise<Lead[]> {
    const queryString = query === undefined ? '' : `?query=${query}`;
    const body = await this.amocrmService.read<AmocrmLeadsResponse>(
      `/api/v4/leads${queryString}`,
    );

    if (body == null) {
      return [];
    }

    return body._embedded.leads.map((info) => ({
      id: info.id,
      name: info.name,
      price: info.price,
      pipelineId: info.pipeline_id,
      statusId: info.status_id,
      responsibleUserId: info.responsible_user_id,
      createdAt: info.created_at,
    }));
  }
}
