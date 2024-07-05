import { Test, TestingModule } from '@nestjs/testing';
import { AmocrmLeadsService } from './amocrm-leads.service';

describe('LeadsService', () => {
  let service: AmocrmLeadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmocrmLeadsService],
    }).compile();

    service = module.get<AmocrmLeadsService>(AmocrmLeadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
