export default class Pessoa{
    private _nome : string;
    private _dataNascimento : number;

    constructor(nome: string,dataNascimento : number){
        this._nome = nome;
        this._dataNascimento = dataNascimento;
    }

    get nome() :string{
        return this._nome;
    }

    set nome(nome:string){
        this._nome =nome;
    }

    get dataNascimento() : number{
        return this._dataNascimento;
    }

    set dataNascimento(dataNascimento : number){
        this._dataNascimento=dataNascimento;
    }
}