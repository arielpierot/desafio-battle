import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from '../characters.service';
import { Mage } from '../entities/mage.entity';
import { Thief } from '../entities/thief.entity';
import {
    characterDtoMageMocked,
    characterDtoThiefMocked,
    characterDtoThiefWrongMocked,
} from './__mocks__/characters.mock';

describe('CharacterService', () => {
    let service: CharacterService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CharacterService],
        }).compile();
        service = module.get<CharacterService>(CharacterService);
        service.clearCharacters();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('success create', () => {
        const result = service.create(characterDtoMageMocked);
        expect(result.getName()).toEqual(characterDtoMageMocked.name);
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
        const characterName = 'Mage Two';
        const result = service.fetch(characterName);
        expect(result).toBeUndefined();
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

    it('success on compare velocity between characters', () => {
        const mageCreated = new Mage('Magician');
        const thiefCreated = new Thief('Thiefian');
        const result = service.compareCharacterVelocity(mageCreated, thiefCreated);
        expect(result.firstAttacker).toBeDefined();
        expect(result.firstDefenser).toBeDefined();
        expect(result.firstAttackerVelocity).toBeGreaterThan(
            result.firstDefenserVelocity,
        );
        expect(result.response).toContain(
            `${result.firstAttacker.getName()} (${result.firstAttackerVelocity
            }) foi mais veloz que ${result.firstDefenser.getName()} (${result.firstDefenserVelocity
            }) e irá começar!`,
        );
    });

    it('success on attack between characters', () => {
        const mageCreated = new Mage('Magician');
        const thiefCreated = new Thief('Thiefian');
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
        const mageCreated = new Mage('Magician');
        const thiefCreated = new Thief('Thiefian');
        service.challenge(mageCreated, thiefCreated, response);
        expect(attackMock).toBeCalledWith(mageCreated, thiefCreated);
        expect(attackMock).toBeCalledTimes(1);
        expect(thiefCreated.getDead()).toEqual(true);
    });
});
