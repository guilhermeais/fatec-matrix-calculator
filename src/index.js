const Matriz = require("./helpers/Matriz");
const Prompt = require("./utils/Prompt");

function renderMatrixView(matrix) {
    let matrizView = '\x1b[1;34m'
        + '***************************\r\n'
        + `******* Matriz ${matrix.length}x${matrix[0].length} *******\r\n`
        + '***************************\r\n\x1b[1;37m';
    for (let i = 0; i < matrix.length; i++) {
        if(i> 0) {
            matrizView += '\r\n';
        }
        
        matrizView += '[';
        
        for (let j = 0; j < matrix[i].length; j++) {
            matrizView += `    ${matrix[i][j]}   `;
        }
        matrizView += ']\r\n';
    }
    return matrizView+'\x1b[1;34m***************************\r\n\x1b[0m';
}

async function insertMatrix() {
    const prompt = new Prompt();
    const matrix = [];
    const lines = parseInt(await prompt.question('Digite a quantidade de linhas: '), 10)
    const columns = parseInt(await prompt.question('Digite a quantidade de colunas: '), 10)
    let matrizView = '\x1b[1;34m'
        + '***************************\r\n'
        + `******* Matriz ${lines}x${columns} *******\r\n`
        + '***************************\r\n\x1b[1;37m';
    for (let i = 0; i < lines; i++) {
        const line = [];
        if(i> 0) {
            matrizView += '\r\n';
        }
        
        matrizView += '[';
        
        for (let j = 0; j < columns; j++) {
            console.clear();
            const value = await prompt.question(matrizView);
            if (!Number.isNaN(parseInt(value, 10))) {
                line.push(value);
                matrizView += `    ${line[j]}   `;
            } else {
                j--;
            }
        }
        matrizView += ']\r\n';
        matrix.push(line);
    }
    console.clear();
    console.log(matrizView+'\x1b[1;34m***************************\r\n\x1b[0m');
    const matriz = new Matriz(matrix);
    console.log(`É quadrada: ${matriz.isSquare? 'Sim' : 'Não'}`);
    if (matriz.isSquare) {
        console.log(`Determinante: ${matriz.determinant}\r\n`);
    }
    main();
}

async function randomMatrix() {
    console.clear()
    const prompt = new Prompt();
    const lines = parseInt(await prompt.question('Digite a quantidade de linhas: '), 10)
    const columns = parseInt(await prompt.question('Digite a quantidade de colunas: '), 10)
    const matrix = [];
    for (let i = 0; i < lines; i++) {
        const line = [];
        for (let j = 0; j < columns; j++) {
            line.push(Math.floor(Math.random() * 10));
        }
        matrix.push(line);
    }
    const matriz = new Matriz(matrix);
    console.log(renderMatrixView(matrix));
    console.log(`É quadrada: ${matriz.isSquare? 'Sim' : 'Não'}`);
    if (matriz.isSquare) {
        console.log(`Determinante: ${matriz.determinant}\r\n`);
    }
    main();
}

function determinant() {
    console.clear()
    const prompt = new Prompt();
    const insertOptions = ['Inserir matriz manualmente','Inserir matriz aleatória', 'Voltar'];
    prompt.startup(insertOptions, 'Como você deseja inserir a matriz?').then(answer => {
        switch (answer) {
            case '1':
                insertMatrix();
                break;
            case '2':
                randomMatrix();
                break;
            case '3':
                main();
                break;
            default:
                console.log('Opção inválida');
                determinant();
        }
    })
}

function main() {
    const prompt = new Prompt();
    const functions = ['Determinante', 'Sair'];
    prompt.startup(functions).then(answer => {
        switch (answer) {
            case '1':
                determinant();
                break;
            case '2':
                console.log('Até mais! :D');
                process.exit();
            default:
                console.log('Opção inválida');
                main();
        }
    })
   
}


main()