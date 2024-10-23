import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PetsAdoService } from './pets-ado/pets-ado.service';
import { PetsAdoController } from './pets-ado/pets-ado.controller';
import { PetsAdoModule } from './pets-ado/pets-ado.module';
import { AdoReqPetModule } from './ado-req-pet/ado-req-pet.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'veterinaria_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    PetsAdoModule,
    AdoReqPetModule,
  ],
})
export class AppModule {}
