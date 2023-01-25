import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from '../../characters/characters.service';
import { BattlesController } from '../battles.controller';
import { BattlesService } from '../battles.service';
import { battleCharactersDto } from './__mocks__/battles.mock';

describe('BattlesService', () => {
  let controller: BattlesController;
  let service: BattlesService;
  let charactersService: CharactersService;
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BattlesController],
      providers: [BattlesService, CharactersService],
    }).compile();
    controller = module.get<BattlesController>(BattlesController);
    service = module.get<BattlesService>(BattlesService);
    charactersService = module.get<CharactersService>(CharactersService);
    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    charactersService.clearCharacters();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('success on battle between characters', () => {
    const battleMock = jest
      .spyOn(service, 'battle')
      .mockImplementation(() => []);

    controller.battle(battleCharactersDto);
    expect(battleMock).toBeCalledWith(battleCharactersDto);
    expect(battleMock).toBeCalledTimes(1);
  });
});
