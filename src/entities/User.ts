import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Model from "./Model";

@Entity()
export class User extends Model {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPass() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  generateToken() {
    const payload = { _id: this.id, email: this.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "3600",
    });

    return token;
  }
}
