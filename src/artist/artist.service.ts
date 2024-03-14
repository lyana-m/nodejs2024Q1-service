import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ArtistDto } from './dto/artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {
  private favArtists: ArtistDto[] = [];

  constructor(private prisma: PrismaService) {}

  async getAllArtists(): Promise<ArtistDto[]> {
    return await this.prisma.artist.findMany();
  }

  async getArtistById(id: string): Promise<ArtistDto> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new HttpException(
        `Artist with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto) {
    const artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    const createdArtist = await this.prisma.artist.create({
      data: { ...artist },
    });

    return createdArtist;
  }

  async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.getArtistById(id);

    const updatedArtist = await this.prisma.artist.update({
      where: { id },
      data: { ...artist, ...updateArtistDto },
    });

    return updatedArtist;
  }

  async deleteArtist(id: string) {
    await this.getArtistById(id);

    await this.prisma.track.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });

    await this.prisma.album.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });

    await this.prisma.artist.delete({ where: { id } });

    // this.deleteArtistFromFavs(id);
  }

  getFavArtists() {
    return this.favArtists;
  }

  addArtistToFavs(artist: ArtistDto) {
    this.favArtists.push(artist);
  }

  isFavArtist(artistId: string) {
    const artist = this.favArtists.find((artist) => artist.id === artistId);

    return Boolean(artist);
  }

  deleteArtistFromFavs(artistId: string) {
    this.favArtists = this.favArtists.filter(
      (artist) => artist.id !== artistId,
    );
  }
}
