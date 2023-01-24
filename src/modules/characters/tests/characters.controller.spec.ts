import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from '../characters.controller';
import { CharacterService } from '../characters.service';
import { Mage } from '../entities/mage.entity';
import { Thief } from '../entities/thief.entity';
import { Warrior } from '../entities/warrior.entity';
import {
  battleCharactersDto,
  createCharacterDto,
} from './__mocks__/characters.mock';

describe('CharacterService', () => {
  let controller: CharacterController;
  let service: CharacterService;
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterController],
      providers: [CharacterService],
    }).compile();
    controller = module.get<CharacterController>(CharacterController);
    service = module.get<CharacterService>(CharacterService);
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

  it('success on battle between characters', () => {
    const battleMock = jest
      .spyOn(service, 'battle')
      .mockImplementation(() => []);

    controller.battle(battleCharactersDto);
    expect(battleMock).toBeCalledWith(battleCharactersDto);
    expect(battleMock).toBeCalledTimes(1);
  });
});
