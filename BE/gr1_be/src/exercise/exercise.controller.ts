import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';

import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Controller('exercises')
export class ExerciseController {
    constructor(
        private readonly exerciseService: ExerciseService,
    ) { }

    @Post()
    create(
        @Body() dto: CreateExerciseDto,
    ) {
        return this.exerciseService.create(dto);
    }

    @Get()
    findAll() {
        return this.exerciseService.findAll();
    }
    @Get("findBy")
    async getExercises(
        @Query('level') level?: string,
        @Query('type') type?: string,
    ) {
        return this.exerciseService.getExercises(level, type);
    }
    @Get(':id')
    findById(
        @Param('id') id: string,
    ) {
        return this.exerciseService.findById(id);
    }
    @Get(':id/questions')
    getQuestionsByExerciseId(
        @Param('id') exerciseId: string,
    ) {
        return this.exerciseService.getQuestionsByExerciseId(exerciseId);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateExerciseDto,
    ) {
        return this.exerciseService.update(id, dto);
    }

    @Delete(':id')
    delete(
        @Param('id') id: string,
    ) {
        return this.exerciseService.delete(id);
    }
}