import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateArtistDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  grammy: boolean;
}
