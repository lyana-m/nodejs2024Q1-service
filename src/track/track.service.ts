import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

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

  getAllTracks(): TrackDto[] {
    return this.tracks;
  }

  getTrackById(id: string): TrackDto {
    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new HttpException(
        `Track with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return track;
  }

  createTrack(track: TrackDto) {
    this.tracks.push(track);

    return track;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    this.getTrackById(id);

    this.tracks = this.tracks.map((track) => {
      if (track.id === id) {
        return {
          ...track,
          ...updateTrackDto,
        };
      }
      return track;
    });

    return this.getTrackById(id);
  }

  deleteTrack(id: string) {
    this.getTrackById(id);

    this.tracks = this.tracks.filter((track) => track.id !== id);
    this.deleteTrackFromFavs(id);
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
