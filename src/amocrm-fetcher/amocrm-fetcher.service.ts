import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AmocrmErrorResponse } from '../interfaces/amocrm.error.response.interface';

@Injectable()
export class AmocrmFetcherService {
  constructor(private configService: ConfigService) {}

  async read<T>(path: string): Promise<T | null> {
    const response = await fetch(
      `${this.configService.get<string>('BASE_URL')}${path}`,
      {
        headers: {
          Authorization: `Bearer ${this.configService.get<string>('ACCESS_TOKEN')}`,
        },
      },
    );

    const body: AmocrmErrorResponse | T = await response.json();

    if (response.status === 204) {
      return null;
    }

    if (response.status >= 400) {
      throw Error((body as AmocrmErrorResponse).detail);
    }

    return body as T;
  }
}
