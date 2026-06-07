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


@Controller('user-answers')
export class UserAnswersController {
    constructor(
        private readonly userAnswersService: UserAnswersService,
    ) { }

    @Post()
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