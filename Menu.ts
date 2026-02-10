import rls from "readline-sync";
import Game from "./src/model/Game";
import Console from "./src/model/Console";
import ProdutoController from "./src/controller/ProdutoController";
import Produto from "./src/model/Produto";

if (process.platform === "win32") {
    require("child_process").execSync("chcp 65001");
}
const categorias = ["Game", "Console"];

export default function main() {

    const controller = new ProdutoController();

    let escolha: number;

    gerarECadastrarProdutos(controller);


    while (true) {
        process.stdout.write('\x1Bc');
        geraMenu();

        escolha = rls.questionInt(" Digite o operação desejada: > ");

        if (escolha === 0) {
            geraSobre();
            process.exit(0);
        }

        switch (escolha) {
            case 1: {
                console.log("****  LISTAGEM DE PRODUTOS ****");
                controller.listarTodos();
                keyPress(); break;
            }
            case 2: {
                console.log("\n****  BUSCAR POR ID  ****\n");
                const id = rls.questionInt("Digite o ID do produto a ser buscado: > ")
                const produto = controller.buscarPorId(id);
                if (produto) {
                    produto.visualizar()
                } else {
                    console.log(` \n \n Não foi encontrado nenhum Produto com ID ${id}`)
                }

                keyPress(); break;
            }
            case 3: {
                console.log("\n****  CADASTRO PRODUTO ****\n");
                const produtoPreenchido = preencherProduto(controller.gerarID());
                if (produtoPreenchido) controller.cadastrar(produtoPreenchido);
                else console.log("Erro Interno! Tente Novamente!");

                keyPress(); break;
            }
            case 4: {
                console.log("\n****  ATUALIZA PRODUTO ****\n");
                const id = rls.questionInt("Digite o ID do produto a ser Atualizado: > ")
                const produto = controller.buscarPorId(id);
                if (produto) {
                    const produtoPreenchido = preencherProduto(produto.id, produto);
                    if (produtoPreenchido) controller.atualizar(produtoPreenchido);
                    else console.log("Erro Interno! Tente Novamente!");

                } else {
                    console.log(` \n \n Não foi encontrado nenhum Produto com ID ${id}`)
                }
                keyPress(); break;
            }
            case 5: {
                console.log("\n****  EXCLUI PRODUTO ****\n");
                const id = rls.questionInt("Digite o ID do produto a ser deletado: > ")
                const produto = controller.buscarPorId(id);
                if (produto) {
                    controller.deletar(produto.id);
                } else {
                    console.log(` \n \n Não foi encontrado nenhum Produto com ID ${id}`)
                }

                keyPress(); break;
            }
            case 6: console.log("****  LISTAGEM Por Categoria ****");
            const categoria = rls.keyInSelect(categorias, "Qual categoria de produto deseja filtar: >", { cancel: false }) + 1;
            controller.listarPorCategoria(categoria);

                keyPress(); break;

            case 7: console.log("****  Buscar por Nome Produto ****");
                const nome = rls.question("Digite o nome do produto a ser buscado: > ")
                const produtos = controller.buscarPorNome(nome);
                if (produtos.length) {
                    produtos.forEach(p => p.visualizar());
                } else {
                    console.log(` \n \n Não foi encontrado nenhum Produto com nome ${nome}`)
                }


                keyPress(); break;

            default: {
                console.log("\n \n Opção inválida. Tente novamente....");
                keyPress(); break;
            }
        }
    }

}



function geraMenu() {
    console.log("***********************************");
    console.log("*                                 *");
    console.log("*      Loja de Games Gen          *");
    console.log("*                                 *");
    console.log("***********************************");
    console.log("*                                 *");
    console.log("*  1 - Listar todos os Produtos   *");
    console.log("*  2 - Buscar Produto pelo ID     *");
    console.log("*  3 - Cadastrar Produto          *");
    console.log("*  4 - Atualizar Produto          *");
    console.log("*  5 - Deletar Produto            *");
    console.log("*  6 - Listar por Categoria       *");
    console.log("*  7 - Buscar por Nome Produto    *");
    console.log("*  0 - Sair                       *");
    console.log("*                                 *");
    console.log("***********************************");
}

function geraSobre(): void {
    console.log(
        `
         ${"*".repeat(40)}
           Projeto desenvolvido por:
           Ericky Santana - eriicky@live.com
           github.com/erickystn
         ${"*".repeat(40)}
        `,
    );
}

function keyPress(): void {
    console.log("\nPressione enter para continuar...");
    rls.prompt();
}

function preencherProduto(id: number, produto?: Produto): Produto | null {
    if (!produto) {
        const nome = rls.question("Digite o nome do produto: > ");
        const preco = rls.questionFloat("Digite o preço do produto: > ");
        const categoria = rls.keyInSelect(categorias, "Qual o tipo de produto: >", { cancel: false }) + 1;
        switch (categoria) {
            case 1:
                const genero = rls.question("Qual o gênero do Game: > ");
                return new Game(id, nome, preco, genero);

            case 2:
                const armazenamento = rls.question("Qual o valor de armazenamento do Console (somente numeros): > ");
                return new Console(id, nome, preco, armazenamento);

        }

    } else {

        produto.visualizar();

        const nome = rls.question("Digite o nome do produto para atualizar ou Digite Enter para manter: > ", { defaultInput: produto.nome });
        const preco = rls.questionFloat("Digite o preço do produto para atualizar ou Digite Enter para manter: > ", { defaultInput: `${produto.preco}` });
        const categoria = rls.keyInSelect([...categorias, "Manter"], "Deseja atualizar a categoria: >", { cancel: false }) + 1;
        switch (categoria) {
            case 1:
                const genero = rls.question("Qual o gênero do Game para atualizar ou Digite Enter para manter: > ", { defaultInput: (produto as Game).genero });
                return new Game(produto.id, nome, preco, genero);

            case 2:
                const armazenamento = rls.question("Digite o valor do armazamento para atualizar ou Digite Enter para manter: > ", { defaultInput: (produto as Console).armazenamento })
                return new Console(produto.id, nome, preco, armazenamento);

            case 3: return produto.tipo === 1 ? new Game(produto.id, nome, preco, (produto as Game).genero) : new Console(produto.id, nome, preco, (produto as Console).armazenamento);
        }
    }
    return null;
}

function gerarECadastrarProdutos(controller: ProdutoController): void {
    controller.cadastrar(new Game(controller.gerarID(), "Super Mario Odyssey", 299.90, "Plataforma"));
    controller.cadastrar(new Game(controller.gerarID(), "Mario Kart 8 Deluxe", 249.90, "Corrida"));
    controller.cadastrar(new Game(controller.gerarID(), "Super Mario Wonder", 300.00, "Plataforma"));

    controller.cadastrar(new Console(controller.gerarID(), "Xbox Series S", 2199.90, "512GB SSD"));
    controller.cadastrar(new Console(controller.gerarID(), "Xbox Series X", 4499.90, "1TB SSD"));

    controller.cadastrar(new Console(controller.gerarID(), "PlayStation 5 Slim", 3700.00, "1TB SSD"));
    controller.cadastrar(new Console(controller.gerarID(), "PlayStation 4 Pro", 1800.00, "1TB HDD"));

    controller.cadastrar(new Game(controller.gerarID(), "Marvel's Spider-Man 2", 349.90, "Ação/Aventura"));
    controller.cadastrar(new Game(controller.gerarID(), "Spider-Man: Miles Morales", 199.50, "Ação/Aventura"));

    controller.cadastrar(new Game(controller.gerarID(), "Final Fantasy VII Remake", 149.90, "RPG"));
    controller.cadastrar(new Game(controller.gerarID(), "Final Fantasy XVI", 279.90, "RPG"));

    console.log("\nProdutos de teste cadastrados com sucesso!");
}


main();