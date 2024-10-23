import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdoptionRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  date: Date;

  @Column({ nullable: true })
  description: string;
}
