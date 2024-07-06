import { Module } from '@nestjs/common';
import { LeadsController } from './leads/leads.controller';
import { AmocrmLeadsService } from './leads/amocrm-leads.service';
import { ConfigModule } from '@nestjs/config';
import { PipelineService } from './pipeline/pipeline.service';
import { UserService } from './user/user.service';
import { AmocrmFetcherService } from './amocrm-fetcher/amocrm-fetcher.service';
import { ContactsService } from './contacts/contacts.service';

// TODO: Use consistent naming
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [LeadsController],
  providers: [
    AmocrmLeadsService,
    PipelineService,
    UserService,
    ContactsService,
    AmocrmFetcherService,
  ],
})
export class AppModule {}
