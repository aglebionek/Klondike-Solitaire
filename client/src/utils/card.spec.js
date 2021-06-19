import {check4Stack, isDroppable, processRank} from './card'

//  Od kierowniczki
test('It return proper rank to AS', () => {
    expect(processRank("A")).toBe(1);
});

//  Od kierowniczki
test('It is impossible to put king on queen', () => {
    expect(isDroppable("Q","K")).toBeFalsy();
})

//  Od kierowniczki
test('It is possible to put AS on empty final stack', ()=> {
    expect(check4Stack(null,
        { rank: "A", color: "red", shape: "diamonds" }
    )).toBeTruthy();
})
//  Powodzenia tościki!