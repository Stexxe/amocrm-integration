import { Test, TestingModule } from '@nestjs/testing';
import { AmocrmFetcherService } from './amocrm-fetcher.service';

describe('AmocrmFetcherService', () => {
  let service: AmocrmFetcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmocrmFetcherService],
    }).compile();

    service = module.get<AmocrmFetcherService>(AmocrmFetcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
