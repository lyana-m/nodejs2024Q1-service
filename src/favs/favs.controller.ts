import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsDto } from './dto/favs.dto';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  async getFavs(): Promise<FavsDto> {
    return this.favsService.getFavs();
  }

  @Post(':entity/:id')
  async addToFavs(
    @Param('entity') entity: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.favsService.addToFavs(entity, id);
  }

  @Delete(':entity/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async addTrackToFavs(
    @Param('entity') entity: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.favsService.deleteFromFavs(entity, id);
  }
}
