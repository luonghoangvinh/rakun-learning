import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RegisterDto {

    @ApiProperty({
        description: 'Tên người dùng',
        example: 'vinhluong',
    })
    @IsString()
    @IsNotEmpty()
    userName!: string;

    @ApiProperty({
        description: 'Địa chỉ email',
        example: 'vinh@gmail.com',
    })
    @IsString()
    @IsNotEmpty()
    gmail!: string;

    @ApiProperty({
        description: 'Mật khẩu',
        example: '123456',
        minLength: 6,
    })
    @IsString()
    @IsNotEmpty()
    password!: string;
}