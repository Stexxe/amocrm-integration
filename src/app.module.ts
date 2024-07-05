import { Module } from '@nestjs/common';
import { LeadsController } from './leads/leads.controller';
import { AmocrmLeadsService } from './leads/amocrm-leads.service';
import { ConfigModule } from '@nestjs/config';
import { PipelineService } from './pipeline/pipeline.service';
import { UserService } from './user/user.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [LeadsController],
  providers: [AmocrmLeadsService, PipelineService, UserService],
})
export class AppModule {}
