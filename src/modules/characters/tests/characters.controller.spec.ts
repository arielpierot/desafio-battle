import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CharactersController } from '../characters.controller';
import { CharactersService } from '../characters.service';
import { Mage } from '../entities/mage.entity';
import { Thief } from '../entities/thief.entity';
import { Warrior } from '../entities/warrior.entity';
import { createCharacterDto } from './__mocks__/characters.mock';

describe('CharactersService', () => {
  let controller: CharactersController;
  let service: CharactersService;
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [CharactersService],
    }).compile();
    controller = module.get<CharactersController>(CharactersController);
    service = module.get<CharactersService>(CharactersService);
    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    service.clearCharacters();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('success on find a character', () => {
    const fetchMock = jest
      .spyOn(service, 'fetch')
      .mockImplementation((name) => new Mage(name));

    const response = controller.fetch('test');
    expect(response).toBeInstanceOf(Mage);
    expect(fetchMock).toBeCalledWith('test');
    expect(fetchMock).toBeCalledTimes(1);
  });

  it('success on create a character', () => {
    const createMock = jest
      .spyOn(service, 'create')
      .mockImplementation(({ name }) => new Warrior(name));

    const response = controller.create(createCharacterDto);
    expect(response).toBeInstanceOf(Warrior);
    expect(createMock).toBeCalledWith(createCharacterDto);
    expect(createMock).toBeCalledTimes(1);
  });

  it('success on list characters', () => {
    const listMock = jest
      .spyOn(service, 'list')
      .mockImplementation(() => [new Thief('test')]);

    const response = controller.list();
    expect(response).toHaveLength(1);
    expect(response[0]).toBeInstanceOf(Thief);
    expect(listMock).toBeCalledTimes(1);
  });
});
