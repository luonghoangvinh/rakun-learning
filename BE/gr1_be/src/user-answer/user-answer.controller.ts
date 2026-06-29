import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
} from '@nestjs/common';
import { UserAnswersService } from './user-answer.service';
import { CreateUserAnswerDto } from './dto/create-user-anwser.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('user-answers')
export class UserAnswersController {
    constructor(
        private readonly userAnswersService: UserAnswersService,
    ) { }

    @Post()
    @ApiOperation({
                summary: 'Thêm câu trả lời',
                description: 'Đưa dữ liệu của câu trả lời mà người dùng đã thực hiện vào cơ sở dữ liệu',
            })
    create(
        @Body() createUserAnswerDto: CreateUserAnswerDto,
    ) {
        return this.userAnswersService.create(
            createUserAnswerDto,
        );
    }

    @Get()
    findAll() {
        return this.userAnswersService.findAll();
    }

    @ApiOperation({
        summary: 'Lấy lịch sử trả lời câu hỏi',
        description: 'Trả về danh sách các câu hỏi mà người dùng đã trả lời cùng kết quả và thời gian trả lời.',
    })
    @ApiOkResponse({
        description: 'Lấy lịch sử trả lời thành công.',
        schema: {
            example: [
                {
                    "_id": "6a412975c36e1bba23c34b17",
                    "userId": "6a1d7ed4ea40c435b6c02bf1",
                    "questionId": "6a1ffc7b20713e6234e04133",
                    "type": "grammar",
                    "level": "N5",
                    "isCorrect": false,
                    "timeSpent": 4,
                    "answeredAt": "2026-06-28T14:02:29.143Z",
                    "createdAt": "2026-06-28T14:02:29.160Z",
                    "updatedAt": "2026-06-28T14:02:29.160Z"
                }
            ]
        }
    })
    @Get('user/:userId')
    findByUser(
        @Param('userId') userId: string,
    ) {
        return this.userAnswersService.findByUser(userId);
    }

    @Get(':id')
    findOne(
        @Param('id') id: string,
    ) {
        return this.userAnswersService.findOne(id);
    }

    @Delete(':id')
    remove(
        @Param('id') id: string,
    ) {
        return this.userAnswersService.remove(id);
    }
}