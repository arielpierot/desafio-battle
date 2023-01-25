import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from '../characters.service';
import { Mage } from '../entities/mage.entity';
import {
  characterDtoMageMocked,
  characterDtoThiefMocked,
  characterDtoThiefWrongMocked,
} from './__mocks__/characters.mock';

describe('CharactersService', () => {
  let service: CharactersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharactersService],
    }).compile();
    service = module.get<CharactersService>(CharactersService);
    service.clearCharacters();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('success create', () => {
    const result = service.create(characterDtoMageMocked);
    expect(result.getName()).toEqual(characterDtoMageMocked.name);
    expect(result).toBeInstanceOf(Mage);
  });

  it('failed on create when name found', () => {
    const result = service.create(characterDtoMageMocked);
    expect(result.getName()).toEqual(characterDtoMageMocked.name);
    try {
      service.create(characterDtoMageMocked);
    } catch (e) {
      expect(e.message).toBe('name found');
    }
  });

  it('failed on create when name found', () => {
    try {
      service.create(characterDtoThiefWrongMocked);
    } catch (e) {
      expect(e.message).toBe('class not found');
    }
  });

  it('success on find a character', () => {
    const resultCreate = service.create(characterDtoMageMocked);
    expect(resultCreate.getName()).toEqual(characterDtoMageMocked.name);
    const result = service.fetch(characterDtoMageMocked.name);
    expect(result.getName()).toEqual(characterDtoMageMocked.name);
    expect(result).toBeInstanceOf(Mage);
  });

  it('failed on find a character', () => {
    try {
      service.fetch('test');
    } catch (e) {
      expect(e.message).toBe('Not Found');
    }
  });

  it('success on list', () => {
    service.create(characterDtoMageMocked);
    service.create(characterDtoThiefMocked);
    const result = service.list();
    expect(result).toHaveLength(2);
  });

  it('success on empty list', () => {
    const result = service.list();
    expect(result).toHaveLength(0);
  });
});
