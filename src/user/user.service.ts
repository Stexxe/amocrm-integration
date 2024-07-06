import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { AmocrmUsersResponse } from '../interfaces/amocrm.users.response.interface';
import { AmocrmFetcherService } from '../amocrm-fetcher/amocrm-fetcher.service';

@Injectable()
export class UserService {
  constructor(private amocrmService: AmocrmFetcherService) {}

  async getUser(userId: number): Promise<User> {
    return await this.amocrmService.read<AmocrmUsersResponse>(
      `/api/v4/users/${userId}`,
    );
  }
}
