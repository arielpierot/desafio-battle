import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class CreateCharacterDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  @Matches('^[a-zA-Z_]*$')
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
