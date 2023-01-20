import { Module } from '@nestjs/common';
import { CharacterController } from './characters.controller';
import { CharacterService } from './characters.service';

@Module({
    imports: [],
    controllers: [CharacterController],
    providers: [CharacterService],
})
export class CharacterModule { }
