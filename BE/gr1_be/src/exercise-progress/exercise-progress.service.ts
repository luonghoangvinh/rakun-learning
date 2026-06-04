import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { ExerciseProgress } from './exercise-progress.entity';
import { CreateExerciseProgressDto } from './dto/create-exercise-progress.dto';
import { UpdateExerciseProgressDto } from './dto/update-exercise-progress.dto';

@Injectable()
export class ExerciseProgressService {
    constructor(
        @InjectModel(ExerciseProgress.name)
        private readonly progressModel:
            Model<ExerciseProgress>,
    ) { }

    async findByUserId(userId: string) {
        return this.progressModel.find({userId: new Types.ObjectId(userId) }).exec();
    }
    async create(
        dto: CreateExerciseProgressDto,
    ) {
        return this.progressModel.create(dto);
    }

    async findAll() {
        return this.progressModel.find().exec();
    }

    async findById(id: string) {
        const progress =
            await this.progressModel.findById(id);

        if (!progress) {
            throw new NotFoundException(
                'Progress not found',
            );
        }

        return progress;
    }

    async update(
        id: string,
        dto: UpdateExerciseProgressDto,
    ) {
        const progress =
            await this.progressModel.findByIdAndUpdate(
                id,
                dto,
                { new: true },
            );

        if (!progress) {
            throw new NotFoundException(
                'Progress not found',
            );
        }

        return progress;
    }

    async delete(id: string) {
        const progress =
            await this.progressModel.findByIdAndDelete(id);

        if (!progress) {
            throw new NotFoundException(
                'Progress not found',
            );
        }

        return progress;
    }
}