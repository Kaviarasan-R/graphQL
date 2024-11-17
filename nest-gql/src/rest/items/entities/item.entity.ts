import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Listing } from './listing.entity';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

@Entity()
@Unique('unique_item', ['name', 'public'])
export class Item extends AbstractEntity<Item> {
  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  public: boolean;

  // cascade allows CRUD operations
  // nullable is to set whether is optional or mandatory
  @OneToOne(() => Listing, { cascade: true, nullable: true })
  @JoinColumn()
  listing: Listing;

  @OneToMany(() => Comment, (comment) => comment.item, { cascade: true })
  comments: Comment[];

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
    nullable: true,
  })
  role: UserRole;
}
