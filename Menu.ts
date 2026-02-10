import rls from "readline-sync";

if (process.platform === "win32") {
    require("child_process").execSync("chcp 65001");
}

export default function main() {

    let escolha: number;
    

    while (true) {
        process.stdout.write('\x1Bc');
        geraMenu();

        escolha = rls.questionInt(" Digite o operação desejada: > ");

        if (escolha === 0) {
            geraSobre();
            process.exit(0);
        }

        switch (escolha) {
            case 1:
                console.log("****  LISTAGEM DE PRODUTOS ****");

               keyPress(); break;
            case 2:console.log("****  BUSCAR POR ID  ****");

                keyPress();break;
            case 3:console.log("****  CADASTRO PRODUTO ****");

                keyPress();break;
            case 4: console.log("****  ATUALIZA PRODUTO ****");

               keyPress(); break;
            case 5: console.log("****  EXCLUIR PRODUTO ****");

                keyPress();break;

            default: console.log(" Opção inválida. Tente novamente....");
                keyPress();break;
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




main();