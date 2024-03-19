import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TrackService } from 'src/track/track.service';

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

  constructor(private readonly trackService: TrackService) {}

  getAllAlbums(): AlbumDto[] {
    return this.albums;
  }

  getAlbumById(id: string): AlbumDto {
    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new HttpException(
        `Album with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return album;
  }

  createAlbum(album: AlbumDto) {
    this.albums.push(album);

    return album;
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    this.getAlbumById(id);

    this.albums = this.albums.map((album) => {
      if (album.id === id) {
        return {
          ...album,
          ...updateAlbumDto,
        };
      }
      return album;
    });

    return this.getAlbumById(id);
  }

  deleteAlbum(id: string) {
    this.getAlbumById(id);

    this.albums = this.albums.filter((album) => album.id !== id);

    this.trackService.deleteAlbum(id);
    this.deleteAlbumFromFavs(id);
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
