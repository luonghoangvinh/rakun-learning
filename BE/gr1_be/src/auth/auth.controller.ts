import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation } from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({
    summary: 'Đăng ký',
    description: 'Đăng kí tài khoản mới'
})
    register(@Body() dto: RegisterDto) {
        return this.authService.register(
            dto.userName,
            dto.gmail,
            dto.password,
        );
    }

    @Post('login')
    @ApiOperation({
        summary: 'Đăng nhập',
        description: 'Xác thực người dùng bằng gmail và mật khẩu. Nếu thành công sẽ trả về JWT token.'
    })
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto.gmail, dto.password);
    }
}