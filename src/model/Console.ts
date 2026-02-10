import Produto from "./Produto";

export default class Console extends Produto{
    private _armazenamento: string;


	  constructor(id: number, nome: string, preco: number, armazenamento: string) {
        super(id, nome, 2, preco);
        this._armazenamento = armazenamento;
    }    

    /**
     * Getter armazenamento
     * @return {number}
     */
	public get armazenamento(): string {
		return this._armazenamento;
	}

    /**
     * Setter armazenamento
     * @param {number} value
     */
	public set armazenamento(value: string) {
		this._armazenamento = value;
	}

    
    public visualizar(): void {
        super.visualizar();
        console.log(`   Armazenamento: ${this._armazenamento}`);
        console.log(`***************************** \n` );
    }

}