import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TrackDto } from './dto/track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async getAllTracks(): Promise<TrackDto[]> {
    return await this.prisma.track.findMany();
  }

  async getTrackById(id: string): Promise<TrackDto> {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new HttpException(
        `Track with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<TrackDto> {
    const createdTrack = await this.prisma.track.create({
      data: {
        id: uuidv4(),
        ...createTrackDto,
      },
    });

    return createdTrack;
  }

  async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackDto> {
    const track = await this.getTrackById(id);

    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: { ...track, ...updateTrackDto },
    });

    return updatedTrack;
  }

  async deleteTrack(id: string) {
    await this.getTrackById(id);

    await this.prisma.favTrack.deleteMany({ where: { trackId: id } });

    await this.prisma.track.delete({ where: { id } });
  }
}
