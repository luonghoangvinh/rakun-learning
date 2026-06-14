import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
} from '@nestjs/common';

import { DeckService } from './deck.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';

@Controller('decks')
export class DeckController {
    constructor(
        private readonly deckService: DeckService,
    ) { }

    @Post()
    create(
        @Body() dto: CreateDeckDto,
    ) {
        return this.deckService.create(dto);
    }


    @Post(':id/duplicate')
    async duplicate(
        @Param('id') id: string,
    ) {
        const deck = await this.deckService.duplicate(id);

    if (!deck) {
        throw new NotFoundException('Deck not found');
    }

    return deck;
    }


    @Get()
    findAll() {
        return this.deckService.findAll();
    }

    @Get(':id')
    findById(
        @Param('id') id: string,
    ) {
        return this.deckService.findById(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateDeckDto,
    ) {
        return this.deckService.update(id, dto);
    }

    @Delete(':id')
    delete(
        @Param('id') id: string,
    ) {
        return this.deckService.delete(id);
    }
}