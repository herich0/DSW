import Campeao from "@modules/campeoes/typeorm/entities/Campeao";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity ('origens')
export default class Origem{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column() 
    nome: string;
    @Column('text')
    descricao: string;
    @Column()
    tipo_bonus: string;
    @Column()
    campeoes_necessarios:string;
    @Column('text')
    beneficio_ativo:string;
    @OneToMany(() => Campeao, campeao => campeao.origem)
    campeoes: Campeao[];
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}