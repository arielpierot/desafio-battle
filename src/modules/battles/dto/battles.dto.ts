import { IsNotEmpty } from 'class-validator';

export class BattleCharactersDto {
  @IsNotEmpty()
  character_name_first: string;

  @IsNotEmpty()
  character_name_second: string;
}
