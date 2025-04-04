class Endereco {
    private _rua: string;
    private _numero: number;
    private _cidade: string;
    private _estado: string;
    
    public get estado(): string {
        return this._estado;
    }
    public set estado(value: string) {
        this._estado = value;
    }

    public get cidade(): string {
        return this._cidade;
    }
    public set cidade(value: string) {
        this._cidade = value;
    }
    




    constructor(rua: string, numero: number, cidade: string, estado: string) {
      this.rua = rua;
      this.numero = numero;
      this.cidade = cidade;
      this.estado = estado;
    }

}