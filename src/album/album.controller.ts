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
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async getAllAlbums(): Promise<AlbumDto[]> {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AlbumDto> {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  async createAlbum(
    @Body(ValidationPipe) createAlbumDto: CreateAlbumDto,
  ): Promise<AlbumDto> {
    const album = {
      id: uuidv4(),
      ...createAlbumDto,
    };

    return this.albumService.createAlbum(album);
  }

  @Put(':id')
  async updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateAlbum: UpdateAlbumDto,
  ): Promise<AlbumDto> {
    return this.albumService.updateAlbum(id, updateAlbum);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
