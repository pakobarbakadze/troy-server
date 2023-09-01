import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Stay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column("text", { array: true })
  features: string[];

  @Column("text", { array: true })
  images: string[];
}
