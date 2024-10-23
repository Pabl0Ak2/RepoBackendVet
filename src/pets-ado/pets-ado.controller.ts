import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Pet } from './pets-ado.entity';
import { PetsAdoService } from './pets-ado.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('pets-ado')
export class PetsAdoController {
    constructor(private readonly petService: PetsAdoService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        }
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Invalid file type'), false);
        }
        cb(null, true);
      },
    }))
    async create(
      @Body() body: { name: string; age: number; breed: string; adoptionStatus: string },
      @UploadedFile() file: Express.Multer.File
    ): Promise<Pet> {
      const imageUrl = file ? file.filename : null;
      return this.petService.create(body.name, body.age, body.breed, imageUrl);
    }    
  
    @Get()
    findAll(): Promise<Pet[]> {
      return this.petService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Pet> {
      return this.petService.findOne(id);
    }
  
    @Put(':id')
    async update(@Param('id') id: number, @Body() body: Partial<Pet>): Promise<Pet> {
        const petToUpdate = await this.petService.findOne(id);
        if (!petToUpdate) {
            throw new NotFoundException(`Pet with id ${id} not found`);
        }
        const updatedPet = await this.petService.update(id, body);
        return updatedPet;
    }
  
    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
      return this.petService.remove(id);
    }
}
