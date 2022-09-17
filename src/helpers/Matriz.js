module.exports = class Matriz {
    constructor(matriz = [[]]) {
        this.matriz = matriz;
    }

    get isSquare() {
        return Matriz.isSquare(this.matriz);
    }

    get determinant() {
       try {
        return Matriz.getDeterminant(this.matriz);
       } catch (error) {
            return false
       }
    }

    toString(){
        return this.matriz.map(linha => linha.join(' ')).join('') + '\r\n';
    }

    static isSquare(matriz = [[]]) {
        /**
         * Verifica se a matriz é quadrada, basicamente ele verifica se a quantidade de linhas é igual a quantidade de colunas
         * matrix.length = quantidade de linhas
         * matrix[0].length = quantidade de colunas da primeira linha ( ou seja, da linha na posição 0)
         */
        return matriz.every((linha, i) => linha.length === matriz.length);
    }

    static getDeterminant(matriz = [[]]) {
        if (!Matriz.isSquare(matriz)) {
            throw new Error("Matriz não é quadrada");
        }
    
        /**
         * Se a matriz só tiver uma linha (matriz.length === 1) e só tiver uma coluna (matriz[0].length === 1), ela é uma matriz 1x1
         */
        if (matriz.length === 1 && matriz[0].length === 1) {
            return matriz[0][0];
        }
    
        if (matriz.length > 1) {
            let determinante = 0;
            for (let i = 0; i < matriz.length; i++) {
                const posicaoAtual = matriz[0][i]
                /**
                 * Cria uma nova matriz, que é a matriz original, sem a primeira linha e sem a coluna i
                 */
                const matrizAux = matriz.slice(1).map((linha) => linha.filter((_, j) => j !== i))
    
                /**
                 * Se i for par, o determinante é a soma do determinante da matriz auxiliar com o determinante da matriz original multiplicado pelo elemento da primeira linha
                 *  e da coluna i
                 */
                const sinal = i % 2 === 0 ? 1 : -1;
    
                /**
                 * Calcula o determinante da matriz auxiliar
                 */
                determinante += posicaoAtual * Matriz.getDeterminant(matrizAux) * sinal;
            }
            return determinante;
        }
    }
}