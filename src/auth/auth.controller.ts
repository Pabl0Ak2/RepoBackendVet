import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: { name: string; email: string; password: string; role: string }): Promise<User> {
    return this.authService.register(body.name, body.email, body.password, body.role);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<{ access_token: string, role: string, name: string }> {
    return this.authService.login(body.email, body.password);
  }
}

