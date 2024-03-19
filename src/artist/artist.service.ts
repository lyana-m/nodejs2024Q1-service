import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistService {
  private artists: ArtistDto[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      name: 'Ricky Montgomery',
      grammy: false,
    },
  ];
  private favArtists: ArtistDto[] = [];

  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  getAllArtists(): ArtistDto[] {
    return this.artists;
  }

  getArtistById(id: string): ArtistDto {
    const artist = this.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException(
        `Artist with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return artist;
  }

  createArtist(artist: ArtistDto) {
    this.artists.push(artist);

    return artist;
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    this.getArtistById(id);

    this.artists = this.artists.map((artist) => {
      if (artist.id === id) {
        return {
          ...artist,
          ...updateArtistDto,
        };
      }
      return artist;
    });

    return this.getArtistById(id);
  }

  deleteArtist(id: string) {
    this.getArtistById(id);

    this.artists = this.artists.filter((artist) => artist.id !== id);

    this.trackService.deleteArtist(id);
    this.albumService.deleteArtist(id);
    this.deleteArtistFromFavs(id);
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
