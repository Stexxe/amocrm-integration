import { Injectable } from '@nestjs/common';
import { Lead } from '../interfaces/lead.interface';
import { AmocrmErrorResponse } from '../interfaces/amocrm.error.response.interface';
import { AmocrmLeadsResponse } from '../interfaces/amocrm.leads.response.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AmocrmLeadsService {
  constructor(private configService: ConfigService) {}

  async getLeads(query: string | undefined): Promise<Lead[]> {
    const queryString = query === undefined ? '' : `?query=${query}`;
    const response = await fetch(
      `${this.configService.get<string>('BASE_URL')}/api/v4/leads${queryString}`,
      {
        headers: {
          Authorization: `Bearer ${this.configService.get<string>('ACCESS_TOKEN')}`,
        },
      },
    );

    if (response.status === 204) {
      return [];
    }

    const body: AmocrmErrorResponse | AmocrmLeadsResponse =
      await response.json();

    if (response.status >= 400) {
      throw Error((body as AmocrmErrorResponse).detail);
    }

    return (body as AmocrmLeadsResponse)._embedded.leads.map((info) => ({
      id: info.id,
      name: info.name,
      price: info.price,
      pipelineId: info.pipeline_id,
      statusId: info.status_id,
    }));
  }
}
