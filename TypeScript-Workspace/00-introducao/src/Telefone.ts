export default class Telefone{
    private _ddd : string;
    private _number : number;
    private _tipo : string;

    constructor(ddd:string,number:number,tipo:string){
        this._ddd=ddd;
        this._number=number;
        this._tipo=tipo;
    }

    get ddd() :string{
        return this._ddd;
    }

    get number() :number{
        return this._number;
    }

    get tipo() :string{
        return this._tipo;
    }

    set ddd(ddd:string){
        this._ddd =ddd;
    }
    
    set number(number:number){
        this._number =number;
    }
    
    set tipo(tipo:string){
        this._tipo =tipo;
    }
}