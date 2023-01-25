import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from '../../characters/characters.service';
import { BattlesService } from '../battles.service';
import {
  battleCharactersDtoMocked,
  characterDtoMageMocked,
  characterDtoThiefMocked,
} from './__mocks__/battles.mock';

describe('BattlesService', () => {
  let service: BattlesService;
  let charactersService: CharactersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BattlesService, CharactersService],
    }).compile();
    service = module.get<BattlesService>(BattlesService);
    charactersService = module.get<CharactersService>(CharactersService);
    charactersService.clearCharacters();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(charactersService).toBeDefined();
  });

  it('success on compare velocity between characters', () => {
    const mageCreated = charactersService.create(characterDtoMageMocked);
    const thiefCreated = charactersService.create(characterDtoThiefMocked);
    const result = service.compareCharacterVelocity(mageCreated, thiefCreated);
    expect(result.firstAttacker).toBeDefined();
    expect(result.firstDefenser).toBeDefined();
    expect(result.firstAttackerVelocity).toBeGreaterThan(
      result.firstDefenserVelocity,
    );
    expect(result.response).toContain(
      `${result.firstAttacker.getName()} (${
        result.firstAttackerVelocity
      }) foi mais veloz que ${result.firstDefenser.getName()} (${
        result.firstDefenserVelocity
      }) e irá começar!`,
    );
  });

  it('success on attack between characters', () => {
    const mageCreated = charactersService.create(characterDtoMageMocked);
    const thiefCreated = charactersService.create(characterDtoThiefMocked);
    thiefCreated.setLife(0);
    const result = service.attack(mageCreated, thiefCreated);
    expect(result[0]).toContain(
      `${thiefCreated.getName()} com 0 pontos de vida restantes;`,
    );
    expect(result[1]).toContain(`${mageCreated.getName()} venceu a batalha!`);
    expect(thiefCreated.getDead()).toEqual(true);
    expect(thiefCreated.getLife()).toEqual(0);
    expect(mageCreated.getDead()).toEqual(false);
    expect(mageCreated.getLife()).toBeGreaterThan(0);
  });

  it('success on challenge between characters', () => {
    const attackMock = jest
      .spyOn(service, 'attack')
      .mockImplementation((characterOne, characterTwo) => {
        characterTwo.setLife(0);
        characterTwo.setDead(true);
        return [];
      });

    const response = new Array<string>();
    const mageCreated = charactersService.create(characterDtoMageMocked);
    const thiefCreated = charactersService.create(characterDtoThiefMocked);
    service.challenge(mageCreated, thiefCreated, response);
    expect(attackMock).toBeCalledWith(mageCreated, thiefCreated);
    expect(attackMock).toBeCalledTimes(1);
    expect(thiefCreated.getDead()).toEqual(true);
  });

  it('success on battle between characters', () => {
    const mageCreated = charactersService.create(characterDtoMageMocked);
    const thiefCreated = charactersService.create(characterDtoThiefMocked);

    const compareCharacterVelocityMock = jest
      .spyOn(service, 'compareCharacterVelocity')
      .mockImplementation((characterFirst, characterSecond) => {
        return {
          firstAttacker: characterFirst,
          firstAttackerVelocity: 10,
          firstDefenser: characterSecond,
          firstDefenserVelocity: 0,
          response: '',
        };
      });

    const challengeMock = jest
      .spyOn(service, 'challenge')
      .mockImplementation(() => []);

    service.battle(battleCharactersDtoMocked);
    expect(compareCharacterVelocityMock).toBeCalledWith(
      mageCreated,
      thiefCreated,
    );
    expect(compareCharacterVelocityMock).toBeCalledTimes(1);
    expect(challengeMock).toBeCalledTimes(1);
  });
});
