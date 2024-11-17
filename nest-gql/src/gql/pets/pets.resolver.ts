import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { Owner } from '../owners/entities/owner.entity';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private readonly petsService: PetsService) {}

  /* 
  mutation {
    createPet(createPetInput: {
      name: "jillu",
      ownerId: 1
    }) {
      id
      ownerId
    }
  } 
  */
  @Mutation(() => Pet)
  createPet(@Args('createPetInput') createPetInput: CreatePetInput) {
    return this.petsService.create(createPetInput);
  }

  /* 
  {
    pets {
      id
      name
      owner {
        id
        name
      }
    }
  }
  */
  @Query(() => [Pet], { name: 'pets' })
  findAll(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  /* 
  {
    pet(id: 1) {
      id,
      name,
      owner {
        name
      }
    }
  }
  */
  @Query(() => Pet, { name: 'pet' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.findOne(id);
  }

  // This knows nested data in Pet due to @Resolver(() => Pet)
  @ResolveField(() => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    return this.petsService.getOwner(pet.ownerId);
  }
}
