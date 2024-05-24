import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ length: 100, unique: true })
  surname: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  public password: string;

  @Column()
  salt: string;

  @Column({ nullable: true, name: 'hashed_refresh_token' })
  public hashedRefreshToken?: string;
}
