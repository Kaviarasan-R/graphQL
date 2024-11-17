import { Injectable } from '@nestjs/common';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './entities/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnersService } from '../owners/owners.service';
import { Owner } from '../owners/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private readonly petsRepository: Repository<Pet>,
    private readonly ownersService: OwnersService,
  ) {}

  create(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput);

    return this.petsRepository.save(newPet);
  }

  async findAll(): Promise<Pet[]> {
    const data = await this.petsRepository.find();
    console.log('pet', data);
    return data;
  }

  async findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOneByOrFail({ id });
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  }
}
