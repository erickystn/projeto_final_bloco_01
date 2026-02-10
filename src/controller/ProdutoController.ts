import Produto from "../model/Produto";
import ProdutoRepository from "../repository/ProdutoRepository";

export default class ProdutoController implements ProdutoRepository{
    private listaProdutos = new Array<Produto>();
    private Id = 0;

    listarTodos(): void {
        if(this.listaProdutos.length == 0) return console.log("\n A lista de Produtos está vazia. \n\n");
        this.listaProdutos.forEach(prod => prod.visualizar());
    }

    listarPorCategoria(tipo: number): void {
        const listagem = this.listaProdutos.filter(prod => prod.tipo === tipo);
        if(listagem.length>0){
            listagem.forEach(prod => prod.visualizar());
        }else{
            console.log(" Não existem produtos cadastrados para essa categoria. ")
        }
    }

    buscarPorId(id: number): Produto | null {
        const produtoEncontrado = this.listaProdutos.find(prod => prod.id === id);
        return produtoEncontrado || null;
    }

    buscarPorNome(nome: string): Array<Produto> {
        return this.listaProdutos.filter(prod => prod.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    cadastrar(produto: Produto): void {
        this.listaProdutos.push(produto);
        console.log(" Produto criado com Sucesso! ");
    }

    atualizar(produto: Produto): void {
        const indice = this.listaProdutos.findIndex(prod => prod.id === produto.id);
        if(indice !== -1) {
            this.listaProdutos[indice] = produto;
            console.log(" Produto Atualizado com sucesso! ");
        }
    }

    deletar(id: number): void {
        const indice = this.listaProdutos.findIndex(prod => prod.id === id);
        if(indice !== -1) {
            const produtoExcluido = this.listaProdutos.splice(indice, 1);
            console.log(" Produto Excluído com sucesso!");
            produtoExcluido[0]?.visualizar();
        }
    }

    public gerarID(): number {
        return ++this.Id;
    }
}