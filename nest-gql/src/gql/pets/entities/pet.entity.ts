import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Owner } from 'src/gql/owners/entities/owner.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Pet {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type?: string;

  @ManyToOne(() => Owner, (owner) => owner.pets)
  @Field(() => Owner)
  owner: Owner;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  ownerId: number;
}
