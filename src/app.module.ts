import { Module } from '@nestjs/common';
import { LeadsController } from './leads/leads.controller';
import { AmocrmLeadsService } from './leads/amocrm-leads.service';
import { ConfigModule } from '@nestjs/config';
import { AmocrmPipelineService } from './pipeline/amocrm-pipeline.service';
import { AmocrmUserService } from './user/amocrm-user.service';
import { AmocrmFetcherService } from './amocrm-fetcher/amocrm-fetcher.service';
import { AmocrmContactsService } from './contacts/amocrm-contacts.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [LeadsController],
  providers: [
    AmocrmLeadsService,
    AmocrmPipelineService,
    AmocrmUserService,
    AmocrmContactsService,
    AmocrmFetcherService,
  ],
})
export class AppModule {}
