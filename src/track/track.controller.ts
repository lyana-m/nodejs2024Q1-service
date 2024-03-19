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
import { TrackService } from './track.service';
import { TrackDto } from './dto/track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async getAllTracks(): Promise<TrackDto[]> {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  async getTrackById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<TrackDto> {
    return this.trackService.getTrackById(id);
  }

  @Post()
  async createTrack(
    @Body(ValidationPipe) createTrackDto: CreateTrackDto,
  ): Promise<TrackDto> {
    const track = {
      id: uuidv4(),
      ...createTrackDto,
    };

    return this.trackService.createTrack(track);
  }

  @Put(':id')
  async updateTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateTrack: UpdateTrackDto,
  ): Promise<TrackDto> {
    return this.trackService.updateTrack(id, updateTrack);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.deleteTrack(id);
  }
}
