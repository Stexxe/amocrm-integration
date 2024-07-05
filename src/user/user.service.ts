import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AmocrmErrorResponse } from '../interfaces/amocrm.error.response.interface';
import { User } from '../interfaces/user.interface';
import { AmocrmUsersResponse } from '../interfaces/amocrm.users.response.interface';

@Injectable()
export class UserService {
  constructor(private configService: ConfigService) {}

  async getUser(userId: number): Promise<User> {
    const response = await fetch(
      `${this.configService.get<string>('BASE_URL')}/api/v4/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${this.configService.get<string>('ACCESS_TOKEN')}`,
        },
      },
    );

    const body: AmocrmErrorResponse | AmocrmUsersResponse =
      await response.json();

    if (response.status >= 400) {
      throw Error((body as AmocrmErrorResponse).detail);
    }

    return body as AmocrmUsersResponse;
  }
}
