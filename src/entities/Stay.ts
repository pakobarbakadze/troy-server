import { Entity, Column} from "typeorm";
import Model from "./Model";

@Entity()
export class Stay extends Model {
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
