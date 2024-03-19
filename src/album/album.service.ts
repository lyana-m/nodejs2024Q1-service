import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AlbumDto } from './dto/album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
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

    await this.prisma.favAlbum.deleteMany({
      where: { albumId: id },
    });

    await this.prisma.album.delete({ where: { id } });
  }
}
