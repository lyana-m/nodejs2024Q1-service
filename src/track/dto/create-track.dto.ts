import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsInt,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;

  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null;

  @IsNotEmpty()
  @IsInt()
  duration: number;
}
