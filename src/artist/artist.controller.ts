import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  async getAllArtists(): Promise<ArtistDto[]> {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  async getArtistById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ArtistDto> {
    return this.artistService.getArtistById(id);
  }

  @Post()
  async createArtist(
    @Body(ValidationPipe) createArtistDto: CreateArtistDto,
  ): Promise<ArtistDto> {
    const artist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    return this.artistService.createArtist(artist);
  }

  @Put(':id')
  async updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateArtist: UpdateArtistDto,
  ): Promise<ArtistDto> {
    return this.artistService.updateArtist(id, updateArtist);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.deleteArtist(id);
  }
}
