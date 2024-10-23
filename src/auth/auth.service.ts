import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async register(name: string, email: string, password: string, role: string): Promise<User> {
    return this.userService.createUser(name, email, password, role);
  }

  async login(email: string, password: string): Promise<{ access_token: string, role: string, name: string }> {
    const user = await this.userService.findAll().then(users => users.find(u => u.email === email));
    
    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { email: user.email, sub: user.id, role: user.role };

      return {
        access_token: this.jwtService.sign(payload),
        role: user.role,
        name: user.name
      };
    }
    throw new Error('Invalid credentials');
  }
  async findUserById(id: number): Promise<User> {
    return this.userService.findOne(id);
  }
}
