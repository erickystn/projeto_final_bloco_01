export const loader = () => {
    let i = 0;
    const spinner = ['-', '\\', '|', '/'];
    const loader = setInterval(() => {
        console.clear(); // Limpa o console
        console.log('Carregando ' + spinner[i]);
        i = (i + 1) % spinner.length;
    }, 100);


    setTimeout(() => clearInterval(loader), 2000);
}