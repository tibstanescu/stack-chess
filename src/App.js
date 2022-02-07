import React, {useState} from "react";
import cls from 'classnames';

import {game, PLAYERS} from './model.js';
import './App.css';

function App() {
    const [moveCount, setMoveCount] = useState(0);
    const [{iFrom, jFrom, count}, startMove] = useState({});
    const isMove = iFrom != null;
    const action = (i, j, k) => (evt) => {
        evt.stopPropagation();

        if (isMove) {
            if (game.canMoveTo(iFrom, jFrom, i, j)) {
                game.move(iFrom, jFrom, i, j, count || game.board[iFrom][jFrom].length);
            }

            startMove({});
        } else if (game.canPlace(i, j)) {
            game.place(i, j);
            startMove({});
        } else {
            startMove({iFrom: i, jFrom: j, count: game.board[i][j].length - k});
        }


        game.turn = game.turn === PLAYERS.WHITE ? PLAYERS.BLACK : PLAYERS.WHITE;
        setMoveCount(moveCount + 1);
    };

    if (game.isOver()) {
        alert('Game over');
    }


    return (
        <div className="App">
            {
                game.board.map((row, i) =>
                    <div className={cls('row')} key={'row_' + i}>
                        {
                            row.map((stack, j) =>
                                <div className={cls('cell', {
                                    moving: i === iFrom && j === jFrom,
                                    highlight: isMove && game.canMoveTo(iFrom, jFrom, i, j)
                                })}
                                     key={'column_' + j} onClick={action(i, j)}>
                                    {
                                        stack.map((piece, k) =>
                                            <div className={cls('piece', piece)} key={'piece_' + k}
                                                 onClick={action(i, j, k)}/>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

export default App;
