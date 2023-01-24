import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCharacterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  profession: string;
}

export class BattleCharactersDto {
  @IsNotEmpty()
  character_name_first: string;

  @IsNotEmpty()
  character_name_second: string;
}
