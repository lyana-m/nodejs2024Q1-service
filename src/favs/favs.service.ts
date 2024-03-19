import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class FavsService {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  getFavs() {
    const tracks = this.trackService.getFavTracks();
    const albums = this.albumService.getFavAlbums();
    const artists = this.artistService.getFavArtists();

    return { tracks, albums, artists };
  }

  addToFavs(entityName: string, entityId: string) {
    const uppercaseEntityName = `${entityName[0].toUpperCase()}${entityName.slice(
      1,
    )}`;
    const service = `${entityName}Service`;
    const getMethod = `get${uppercaseEntityName}ById`;
    const addMethod = `add${uppercaseEntityName}ToFavs`;

    try {
      const entry = this[service][getMethod](entityId);

      this[service][addMethod](entry);

      return {
        message: `${uppercaseEntityName} successfully added to favorites`,
      };
    } catch {
      throw new HttpException(
        `${uppercaseEntityName} with id ${entityId} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  deleteFromFavs(entityName: string, entityId: string) {
    const uppercaseEntityName = `${entityName[0].toUpperCase()}${entityName.slice(
      1,
    )}`;
    const service = `${entityName}Service`;
    const isFavMethod = `isFav${uppercaseEntityName}`;
    const deleteMethod = `delete${uppercaseEntityName}FromFavs`;

    const isFav = this[service][isFavMethod](entityId);

    if (!isFav) {
      throw new HttpException(
        `${uppercaseEntityName} with id ${entityId} is not included to favorites`,
        HttpStatus.NOT_FOUND,
      );
    }

    this[service][deleteMethod](entityId);

    return {
      message: `${uppercaseEntityName} successfully deleted from favorites`,
    };
  }
}
