import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';

import { ExerciseProgressService } from './exercise-progress.service';
import { CreateExerciseProgressDto } from './dto/create-exercise-progress.dto';
import { UpdateExerciseProgressDto } from './dto/update-exercise-progress.dto';

@Controller('exercise-progress')
export class ExerciseProgressController {
    constructor(
        private readonly progressService: ExerciseProgressService,
    ) { }

    @Post()
    create(
        @Body() dto: CreateExerciseProgressDto,
    ) {
        return this.progressService.create(dto);
    }

    @Get()
    findAll() {
        return this.progressService.findAll();
    }

    @Get(':id')
    findById(
        @Param('id') id: string,
    ) {
        return this.progressService.findById(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateExerciseProgressDto,
    ) {
        return this.progressService.update(id, dto);
    }

    @Delete(':id')
    delete(
        @Param('id') id: string,
    ) {
        return this.progressService.delete(id);
    }
    @Get('user/:userId')
    getProgressByUserId(
        @Param('userId') userId: string,
    ) {
        return this.progressService.findByUserId(userId);
    }
}