export const PLAYERS = {
    WHITE: 'white',
    BLACK: 'black'
};

class Game {
    turn = PLAYERS.WHITE;
    board = Array(5).fill(Array(5).fill(0)).map(row => row.map(stack => []));

    isOver = () => !this.every((i, j) => this.board[i][j].length <= 5);
    canPlace = (i, j) => !this.board[i][j].length;
    place = (i, j) => this.board[i][j].push(this.turn);

    canMoveTo = (iFrom, jFrom, iTo, jTo) => !this.canPlace(iTo, jTo) && (iFrom !== iTo || jFrom !== jTo) &&
        this.moves[this.board[iFrom][jFrom].length](iFrom, jFrom, iTo, jTo);
    canMove = (iFrom, jFrom, iTo, jTo, count) => count <= this.board[iFrom][jFrom].length &&
        this.canMoveTo(iFrom, jFrom, iTo, jTo);
    move = (iFrom, jFrom, iTo, jTo, count) => {
        const stack = this.board[iFrom][jFrom].splice(-count, count);
        this.board[iTo][jTo] = [...this.board[iTo][jTo], ...stack];
    };


    moves = [
        // 0 - Empty
        () => false,
        // 1 - Pawn
        (iFrom, jFrom, iTo, jTo) => iFrom === iTo && Math.abs(jFrom - jTo) === 1 ||
            jFrom === jTo && Math.abs(iFrom - iTo) === 1,
        // 2 - Rook
        (iFrom, jFrom, iTo, jTo) => iFrom === iTo && this.isFreeLine(iFrom, jFrom, jTo) ||
            jFrom === jTo && this.isFreeColumn(jFrom, iFrom, iTo),
        // 3 - Knight
        (iFrom, jFrom, iTo, jTo) => Math.abs(iFrom - iTo) === 2 && Math.abs(jFrom - jTo) === 1 ||
            Math.abs(iFrom - iTo) === 1 && Math.abs(jFrom - jTo) === 2,
        // 4 - Bishop
        (iFrom, jFrom, iTo, jTo) => iFrom - jFrom === iTo - jTo && this.isFreePrimaryDiagonal(iFrom, jFrom, iTo, jTo) ||
            iFrom + jFrom === iTo + jTo && this.isFreeSecondaryDiagonal(iFrom, jFrom, iTo, jTo),
        // 5 - Queen
        (iFrom, jFrom, iTo, jTo) => this.moves[2](iFrom, jFrom, iTo, jTo) ||
            this.moves[4](iFrom, jFrom, iTo, jTo),
    ];

    every = (fn) => this.board.every((row, i) => row.every((stack, j) => fn(i, j)));
    isFreeLine = (iFrom, jFrom, jTo) => this.every(
        (i, j) => i !== iFrom || j <= jFrom && j <= jTo || j >= jFrom && j >= jTo || !this.board[i][j].length
    );
    isFreeColumn = (jFrom, iFrom, iTo) => this.every(
        (i, j) => j !== jFrom || i <= iFrom && i <= iTo || i >= iFrom && i >= iTo || !this.board[i][j].length
    );
    isFreePrimaryDiagonal = (iFrom, jFrom, iTo, jTo) => this.every(
        (i, j) => iFrom - jFrom !== i - j || i <= iFrom && i <= iTo || i >= iFrom && i >= iTo || !this.board[i][j].length
    );

    isFreeSecondaryDiagonal = (iFrom, jFrom, iTo, jTo) => this.every(
        (i, j) => iFrom + jFrom !== i + j || i <= iFrom && i <= iTo || i >= iFrom && i >= iTo || !this.board[i][j].length
    );
}

export const game = new Game();