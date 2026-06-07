import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserAnswer, UserAnswerDocument } from './user-answer.entity';
import { CreateUserAnswerDto } from './dto/create-user-anwser.dto';

@Injectable()
export class UserAnswersService {
    constructor(
        @InjectModel(UserAnswer.name)
        private readonly userAnswerModel: Model<UserAnswerDocument>,
    ) { }

    async create(createUserAnswerDto: CreateUserAnswerDto) {
        const userAnswer = await this.userAnswerModel.create({
            ...createUserAnswerDto,
            userId: new Types.ObjectId(createUserAnswerDto.userId),
            questionId: new Types.ObjectId(createUserAnswerDto.questionId),
        });

        return userAnswer.toObject();
    }

    async findAll() {
        return this.userAnswerModel
            .find()
            .sort({ answeredAt: -1 })
            .lean();
    }

    async findByUser(userId: string) {
        return this.userAnswerModel
            .find({
                userId: new Types.ObjectId(userId),
            })
            .sort({ answeredAt: -1 })
            .lean();
    }

    async findOne(id: string) {
        const answer = await this.userAnswerModel
            .findById(id)
            .lean();

        if (!answer) {
            throw new NotFoundException('User answer not found');
        }

        return answer;
    }

    async remove(id: string) {
        const answer = await this.userAnswerModel.findByIdAndDelete(id);

        if (!answer) {
            throw new NotFoundException('User answer not found');
        }

        return {
            message: 'Deleted successfully',
        };
    }
}