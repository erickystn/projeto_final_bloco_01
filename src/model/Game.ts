import Produto from "./Produto";

export default class Game extends Produto {
    private _genero: string;


    constructor(id: number, nome: string, preco: number, genero: string) {
        super(id, nome, 1, preco);
        this._genero = genero;
    }


    /**
     * Getter genero
     * @return {string}
     */
    public get genero(): string {
        return this._genero;
    }

    /**
     * Setter genero
     * @param {string} value
     */
    public set genero(value: string) {
        this._genero = value;
    }


    public visualizar(): void {
        super.visualizar();
        console.log(`   Gênero: ${this.genero}`);
        console.log(`***************************** \n` );
    }
}