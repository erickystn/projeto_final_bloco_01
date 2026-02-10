import Produto from "../model/Produto";


export default interface ProdutoRepository{
    listarTodos():void;
    listarPorCategoria(tipo: number):void;
    buscarPorId(id: number):void;
    buscarPorNome(nome: string):Array<Produto>;
    cadastrar(produto:Produto):void;
    atualizar(produto:Produto):void;
    deletar(id:number): void;
}