import { Module } from '@nestjs/common';
import { LeadsController } from './leads/leads.controller';
import { AmocrmLeadsService } from './leads/amocrm-leads.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [LeadsController],
  providers: [AmocrmLeadsService],
})
export class AppModule {}
