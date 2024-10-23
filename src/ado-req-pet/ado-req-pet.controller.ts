import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AdoptionRequest } from './ado-req-pet.entity';
import { AdoReqPetService } from './ado-req-pet.service';

@Controller('ado-req-pet')
export class AdoReqPetController {
  constructor(private readonly adoptionService: AdoReqPetService) {}

  @Post()
  create(@Body() body: { name: string; email: string; phone: string; date: Date; description?: string }): Promise<AdoptionRequest> {
    return this.adoptionService.createAdoptionRequest(body.name, body.email, body.phone, body.date, body.description);
  }

  @Get()
  findAll(): Promise<AdoptionRequest[]> {
    return this.adoptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<AdoptionRequest> {
    return this.adoptionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: Partial<AdoptionRequest>): Promise<AdoptionRequest> {
    return this.adoptionService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.adoptionService.remove(id);
  }
}
