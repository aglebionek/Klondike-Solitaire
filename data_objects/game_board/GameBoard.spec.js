import Board from "./GameBoard";

//  Ten test nie przechodzi, natomiast po npm run test wyraźnie widać
//  że błąd jest po stronie kodu.
test('state is not finish on start', () => {
    expect(new Board()).toBe(false);
});