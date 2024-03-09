import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsUUID('4')
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
}
