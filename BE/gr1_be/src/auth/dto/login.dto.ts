import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    MinLength,
} from 'class-validator';

export class LoginDto {

    @ApiProperty({
        description: 'Email đăng nhập',
        example: 'vinh@gmail.com',
    })
    @IsString()
    gmail!: string;

    @ApiProperty({
        description: 'Mật khẩu',
        example: '123456',
        minLength: 6,
    })
    @MinLength(6)
    password!: string;
}