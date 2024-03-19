import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavsService {
  constructor(private readonly prisma: PrismaService) {}

  async getFavs() {
    const tracks = await this.prisma.track.findMany({
      where: {
        favTrack: {
          some: {},
        },
      },
    });
    const albums = await this.prisma.album.findMany({
      where: {
        favAlbum: {
          some: {},
        },
      },
    });
    const artists = await this.prisma.artist.findMany({
      where: {
        favArtist: {
          some: {},
        },
      },
    });

    return { tracks, albums, artists };
  }

  async addToFavs(entityName: string, entityId: string) {
    const uppercaseEntityName = `${entityName[0].toUpperCase()}${entityName.slice(
      1,
    )}`;
    const domain = `fav${uppercaseEntityName}`;
    const idName = `${entityName}Id`;

    const entry = await this.prisma[entityName].findUnique({
      where: { id: entityId },
    });

    if (!entry) {
      throw new HttpException(
        `${uppercaseEntityName} with id ${entityId} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.prisma[domain].create({ data: { [idName]: entityId } });

    return {
      message: `${uppercaseEntityName} successfully added to favorites`,
    };
  }

  async deleteFromFavs(entityName: string, entityId: string) {
    const uppercaseEntityName = `${entityName[0].toUpperCase()}${entityName.slice(
      1,
    )}`;
    const domain = `fav${uppercaseEntityName}`;
    const idName = `${entityName}Id`;

    const favEntry = await this.prisma[domain].findUnique({
      where: { [idName]: entityId },
    });

    if (!favEntry) {
      throw new HttpException(
        `${uppercaseEntityName} with id ${entityId} is not included to favorites`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.prisma[domain].delete({ where: { [idName]: entityId } });

    return {
      message: `${uppercaseEntityName} successfully deleted from favorites`,
    };
  }
}
