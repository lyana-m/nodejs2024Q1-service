import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TrackDto } from './dto/track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TrackService {
  private tracks: TrackDto[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'This december',
      artistId: null,
      albumId: null,
      duration: 182,
    },
  ];
  private favTracks: TrackDto[] = [];

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

    await this.prisma.track.delete({ where: { id } });

    // this.deleteTrackFromFavs(id);
  }

  deleteArtist(artistId: string) {
    this.tracks = this.tracks.map((track) => {
      if (track.artistId === artistId) {
        return { ...track, artistId: null };
      }
      return track;
    });
  }

  deleteAlbum(albumId: string) {
    this.tracks = this.tracks.map((track) => {
      if (track.albumId === albumId) {
        return { ...track, albumId: null };
      }
      return track;
    });
  }

  getFavTracks() {
    return this.favTracks;
  }

  addTrackToFavs(track: TrackDto) {
    this.favTracks.push(track);
  }

  isFavTrack(trackId: string) {
    const track = this.favTracks.find((track) => track.id === trackId);

    return Boolean(track);
  }

  deleteTrackFromFavs(trackId: string) {
    this.favTracks = this.favTracks.filter((track) => track.id !== trackId);
  }
}
