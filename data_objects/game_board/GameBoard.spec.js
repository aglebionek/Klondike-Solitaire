import Board from "./GameBoard";

//  Ten test nie przechodzi, natomiast po npm -- GameBoard wyraźnie widać
//  że błąd jest po stronie kodu.
test('state is not finish on start', () => {
    let board = new Board();
    expect(board.finishState).toBe(false);
});