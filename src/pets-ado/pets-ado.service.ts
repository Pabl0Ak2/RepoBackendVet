import { Injectable, NotFoundException } from '@nestjs/common';
import { Pet } from './pets-ado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PetsAdoService {
    constructor(
        @InjectRepository(Pet)
        private petRepository: Repository<Pet>,
      ) {}
    
      async create(name: string, age: number, breed: string, imageUrl: string): Promise<Pet> {
        const pet = this.petRepository.create({
          name,
          age,
          breed,
          imageUrl: imageUrl,
        });
        return this.petRepository.save(pet);
      }
         
    
      findAll(): Promise<Pet[]> {
        return this.petRepository.find();
      }
    
      findOne(id: number): Promise<Pet> {
        return this.petRepository.findOneBy({ id });
      }
    
      async update(id: number, petData: Partial<Pet>): Promise<Pet> {
        const petToUpdate = await this.findOne(id);
        if (!petToUpdate) {
            throw new NotFoundException(`Pet with id ${id} not found`);
        }
        const updatedPet = this.petRepository.create({ ...petToUpdate, ...petData });
        await this.petRepository.save(updatedPet);
        return updatedPet;
    }   
    
      async remove(id: number): Promise<void> {
        await this.petRepository.delete(id);
      }
}
