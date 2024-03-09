import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { TrackModule } from 'src/track/track.module';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [TrackModule, ArtistModule, AlbumModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
