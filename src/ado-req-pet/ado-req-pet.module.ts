import { Module } from '@nestjs/common';
import { AdoReqPetService } from './ado-req-pet.service';
import { AdoReqPetController } from './ado-req-pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdoptionRequest } from './ado-req-pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdoptionRequest])],
  providers: [AdoReqPetService],
  controllers: [AdoReqPetController],
})
export class AdoReqPetModule {}
