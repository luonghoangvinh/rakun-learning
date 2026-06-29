import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Exercise } from './exercise.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Question } from '../question/question.entity';
import { ExerciseProgress } from '../exercise-progress/exercise-progress.entity';

@Injectable()
export class ExerciseService {
    constructor(
        @InjectModel(Exercise.name)
        private readonly exerciseModel: Model<Exercise>,

        @InjectModel(Question.name)
        private readonly questionModel: Model<Question>,

        @InjectModel(ExerciseProgress.name)
        private readonly exerciseProgressModel: Model<ExerciseProgress>
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

    async findByUserIdAndId(userId: string,id: string) {
        const exercise = await this.exerciseModel.findById(id);
        const userProgress = await this.exerciseProgressModel.find({ userId: new Types.ObjectId(userId) });
        if (!exercise) {
            throw new NotFoundException(
                'Exercise not found',
            );
        }

        return {
            ...exercise.toObject(),
            completed: userProgress.some(p => p.exerciseId.equals(exercise._id)),
            progressId: userProgress.find(p => p.exerciseId.equals(exercise._id))?._id??""
        };
    }

    async update(
        id: string,
        dto: UpdateExerciseDto,
    ) {
        const exercise =
            await this.exerciseModel.findByIdAndUpdate(
                { _id: new Types.ObjectId(id) },
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
            await this.exerciseModel.findByIdAndDelete({ _id: new Types.ObjectId(id) });

        if (!exercise) {
            throw new NotFoundException(
                'Exercise not found',
            );
        }

        return exercise;
    }


    async getExercises(
        userId?: string,
        level?: string,
        type?: string,
    ) {
        let userProgress: ExerciseProgress[] = [];
        const filter: any = {};

        if (level) {
            filter.level = level;
        }

        if (type) {
            filter.type = type;
        }
        if (userId) {
            userProgress = await this.exerciseProgressModel.find({ userId: new Types.ObjectId(userId) });
        }

        const exercises = await this.exerciseModel.find(filter);

        return exercises.map(ex => ({
            ...ex.toObject(),
            completed: userProgress.some(p => p.exerciseId.equals(ex._id)),
            score: userProgress.find(p => p.exerciseId.equals(ex._id))?.score ?? 0,
            progressId: userProgress.find(p => p.exerciseId.equals(ex._id))?._id ?? ""
        }));
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