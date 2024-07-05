import { Injectable } from '@nestjs/common';
import { AmocrmPipelineResponse } from "../interfaces/amocrm.pipeline.response.interface";
import { ConfigService } from "@nestjs/config";
import { AmocrmErrorResponse } from "../interfaces/amocrm.error.response.interface";
import { PipelineStatus } from "../interfaces/pipeline-status.interface";

@Injectable()
export class PipelineService {
  constructor(private configService: ConfigService) {}

  async getStatuses(pipelineId: number): Promise<PipelineStatus[]> {
    const response = await fetch(
      `${this.configService.get<string>('BASE_URL')}/api/v4/leads/pipelines/${pipelineId}`,
      {
        headers: {
          Authorization: `Bearer ${this.configService.get<string>('ACCESS_TOKEN')}`,
        },
      },
    );

    const body: AmocrmErrorResponse | AmocrmPipelineResponse =
      await response.json();

    if (response.status >= 400) {
      throw Error((body as AmocrmErrorResponse).detail);
    }

    return (body as AmocrmPipelineResponse)._embedded.statuses.map((status) => ({
      id: status.id,
      name: status.name
    }))
  }
}
