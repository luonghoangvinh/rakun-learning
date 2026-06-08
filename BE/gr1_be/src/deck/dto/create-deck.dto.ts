import {
    IsArray,
    IsMongoId,
    isMongoId,
    isObject,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import { CreateFlashcardDto } from '../../flashcard/dto/create-flashcard.dto';

export class CreateDeckDto {

    @IsMongoId()
    userId!:string;
    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateFlashcardDto)
    cards!: CreateFlashcardDto[];

    @IsOptional()
    @IsString()
    color?: string;

    @IsOptional()
    @IsString()
    icon?: string;

    @IsString()
    visibility!: string;
}