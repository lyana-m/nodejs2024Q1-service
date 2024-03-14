import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AlbumDto } from './dto/album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  private albums: AlbumDto[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440004',
      name: 'The Album',
      artistId: null,
      year: 2017,
    },
  ];
  private favAlbums: AlbumDto[] = [];

  constructor(private prisma: PrismaService) {}

  async getAllAlbums(): Promise<AlbumDto[]> {
    return await this.prisma.album.findMany();
  }

  async getAlbumById(id: string): Promise<AlbumDto> {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new HttpException(
        `Album with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<AlbumDto> {
    const album = {
      id: uuidv4(),
      ...createAlbumDto,
    };

    const createdAlbum = await this.prisma.album.create({ data: { ...album } });

    return createdAlbum;
  }

  async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumDto> {
    const album = await this.getAlbumById(id);

    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: { ...album, ...updateAlbumDto },
    });

    return updatedAlbum;
  }

  async deleteAlbum(id: string) {
    await this.getAlbumById(id);

    await this.prisma.track.updateMany({
      where: { albumId: id },
      data: { albumId: null },
    });

    await this.prisma.album.delete({ where: { id } });

    // this.trackService.deleteAlbum(id);
    // this.deleteAlbumFromFavs(id);
  }

  deleteArtist(artistId: string) {
    this.albums = this.albums.map((album) => {
      if (album.artistId === artistId) {
        return { ...album, artistId: null };
      }
      return album;
    });
  }

  getFavAlbums() {
    return this.favAlbums;
  }

  addAlbumToFavs(album: AlbumDto) {
    this.favAlbums.push(album);
  }

  isFavAlbum(albumId: string) {
    const album = this.favAlbums.find((album) => album.id === albumId);

    return Boolean(album);
  }

  deleteAlbumFromFavs(albumId: string) {
    this.favAlbums = this.favAlbums.filter((album) => album.id !== albumId);
  }
}
