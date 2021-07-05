import {Entity, PrimaryGeneratedColumn, Column, createConnection, Connection, Repository} from 'typeorm';

@Entity()
export class Notes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: string;

  @Column('text')
  description: string;
}

let connection:Connection;

export async function getNotesRepository(): Promise<Repository<Notes>> {
  if (connection===undefined) {
    connection = await createConnection({
      type: 'sqlite',
      database: 'myangularapp',
      synchronize: true,
      entities: [
        Notes
      ],
    });
  }
  return connection.getRepository(Notes);
}
