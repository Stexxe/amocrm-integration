import { Injectable } from '@nestjs/common';
import { AmocrmPipelineResponse } from '../interfaces/amocrm.pipeline.response.interface';
import { PipelineStatus } from '../interfaces/pipeline-status.interface';
import { AmocrmFetcherService } from '../amocrm-fetcher/amocrm-fetcher.service';

@Injectable()
export class PipelineService {
  constructor(private amocrmService: AmocrmFetcherService) {}

  async getStatuses(pipelineId: number): Promise<PipelineStatus[]> {
    const body = await this.amocrmService.read<AmocrmPipelineResponse>(
      `/api/v4/leads/pipelines/${pipelineId}`,
    );

    return body._embedded.statuses.map((status) => ({
      id: status.id,
      name: status.name,
    }));
  }
}
