import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pets-ado.entity';
import { PetsAdoService } from './pets-ado.service';
import { PetsAdoController } from './pets-ado.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Pet])],
    providers: [PetsAdoService],
    controllers: [PetsAdoController],
    exports: [PetsAdoService]
})
export class PetsAdoModule {}
