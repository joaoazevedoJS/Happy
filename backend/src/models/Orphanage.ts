import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'

import Image from './Image'

@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: number;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  // Quando cadastrar o orfanato ou alterar, ele vai automaticamente, cadastrar ou alterar a imagens no orfanato
  @OneToMany(() => Image, image => image.orphanage, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'orphanage_id' }) // Nome da Coluna que armazena o nome do relacionamento da imagem
  images: Image[]
}