import Origem from "@modules/origens/typeorm/entities/Origem";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity ('campeoes')
export default class Campeao{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column() 
    nome: string;
    @Column('int')
    custo: number;
    @Column()
    classe: string;
    @Column()
    habilidade:string;
    @Column('int')
    vida_base:number;
    @JoinColumn({ name: 'origem_id' })
    @ManyToOne(() => Origem, origem => origem.campeoes)
    origem: Origem;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}