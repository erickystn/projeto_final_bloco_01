import rls from "readline-sync";
import Game from "./src/model/Game";
import Console from "./src/model/Console";
import ProdutoController from "./src/controller/ProdutoController";

if (process.platform === "win32") {
    require("child_process").execSync("chcp 65001");
}

export default function main() {

    const controller = new ProdutoController();
    const categorias = ["Game", "Console"];
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
                const nome = rls.question("Digite o nome do produto: > ");
                const preco = rls.questionFloat("Digite o preço do produto: > ");
                const categoria = rls.keyInSelect(categorias, "Qual o tipo de produto: >", { cancel: false }) + 1;
                switch (categoria) {
                    case 1:
                        const genero = rls.question("Qual o gênero do Game: > ");
                        controller.cadastrar(new Game(controller.gerarID(), nome, preco, genero))
                        break;

                    case 2:
                        const armazenamento = rls.question("Qual o valor de armazenamento do Console (somente numeros): > ");
                        controller.cadastrar(new Console(controller.gerarID(), nome, preco, armazenamento));
                        break;
                }



                keyPress(); break;
            }
            case 4: {
                console.log("\n****  ATUALIZA PRODUTO ****\n");

                const id = rls.questionInt("Digite o ID do produto a ser Atualizado: > ")
                const produto = controller.buscarPorId(id);
                if (produto) {
                    produto.visualizar();

                    const nome = rls.question("Digite o nome do produto para atualizar ou Digite Enter para manter: > ", { defaultInput: produto.nome });
                    const preco = rls.questionFloat("Digite o preço do produto para atualizar ou Digite Enter para manter: > ", { defaultInput: `${produto.preco}` });
                    const categoria = rls.keyInSelect([...categorias, "Manter"], "Deseja atualizar a categoria: >", { cancel: false }) + 1;
                    switch (categoria) {
                        case 1:
                            const genero = rls.question("Qual o gênero do Game para atualizar ou Digite Enter para manter: > ", { defaultInput: (produto as Game).genero });
                            controller.atualizar(new Game(produto.id, nome, preco, genero))
                            break;

                        case 2:
                            const armazenamento = rls.question("Digite o valor do armazamento para atualizar ou Digite Enter para manter: > ", { defaultInput: (produto as Console).armazenamento })
                            controller.atualizar(new Console(produto.id, nome, preco, armazenamento));
                            break;
                        case 3: controller.atualizar(produto.tipo === 1 ? new Game(produto.id, nome, preco, (produto as Game).genero) : new Console(produto.id, nome, preco, (produto as Console).armazenamento));
                    }


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

            default: {
                console.log(" Opção inválida. Tente novamente....");
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

function gerarECadastrarProdutos (controller : ProdutoController): void{
     controller.cadastrar(new Game(controller.gerarID(), "God of War", 100.50, "Aventura"));
     controller.cadastrar(new Console(controller.gerarID(), "PlayStation 5", 3500.45, "1TB"));
}


main();