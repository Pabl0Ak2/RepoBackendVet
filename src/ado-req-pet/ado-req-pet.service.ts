import { Injectable } from '@nestjs/common';
import { AdoptionRequest } from './ado-req-pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdoReqPetService {
  constructor(
    @InjectRepository(AdoptionRequest)
    private readonly adoptionRepository: Repository<AdoptionRequest>,
  ) {}

  async createAdoptionRequest(
    name: string,
    email: string,
    phone: string,
    date: Date,
    description?: string,
  ): Promise<AdoptionRequest> {
    const newRequest = this.adoptionRepository.create({ name, email, phone, date, description });
    return this.adoptionRepository.save(newRequest);
  }

  async findAll(): Promise<AdoptionRequest[]> {
    return this.adoptionRepository.find();
  }

  async findOne(id: number): Promise<AdoptionRequest> {
    return this.adoptionRepository.findOneBy({ id });
  }

  async update(id: number, request: Partial<AdoptionRequest>): Promise<AdoptionRequest> {
    await this.adoptionRepository.update(id, request);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.adoptionRepository.delete(id);
  }
}
