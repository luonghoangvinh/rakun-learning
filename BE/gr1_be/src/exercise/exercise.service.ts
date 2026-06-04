import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Exercise } from './exercise.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Question } from '../question/question.entity';

@Injectable()
export class ExerciseService {
    constructor(
        @InjectModel(Exercise.name)
        private readonly exerciseModel: Model<Exercise>,

        @InjectModel(Question.name)
        private readonly questionModel: Model<Question>,
    ) { }

    async create(dto: CreateExerciseDto) {
        return this.exerciseModel.create(dto);
    }

    async findAll() {
        return this.exerciseModel.find().exec();
    }

    async findById(id: string) {
        const exercise =
            await this.exerciseModel.findById(id);

        if (!exercise) {
            throw new NotFoundException(
                'Exercise not found',
            );
        }

        return exercise;
    }

    async update(
        id: string,
        dto: UpdateExerciseDto,
    ) {
        const exercise =
            await this.exerciseModel.findByIdAndUpdate(
                id,
                dto,
                { new: true },
            );

        if (!exercise) {
            throw new NotFoundException(
                'Exercise not found',
            );
        }

        return exercise;
    }

    async delete(id: string) {
        const exercise =
            await this.exerciseModel.findByIdAndDelete(id);

        if (!exercise) {
            throw new NotFoundException(
                'Exercise not found',
            );
        }

        return exercise;
    }


    async getExercises(
        level?: string,
        type?: string,
    ) {
        const filter: any = {};

        if (level) {
            filter.level = level;
        }

        if (type) {
            filter.type = type;
        }

        return this.exerciseModel.find(filter);
    }
    async getQuestionsByExerciseId(exerciseId: string) {
        const exercise = await this.exerciseModel.findById(exerciseId);

        if (!exercise) {
            throw new NotFoundException('Exercise not found');
        }

        return this.questionModel.find({
            _id: { $in: exercise.questionIDs }
        });
    }
}