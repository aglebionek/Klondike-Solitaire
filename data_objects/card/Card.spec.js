import Card from "./Card";


test('throw exception when invalid ID', () => {
    expect(() => {
        new Card(52);
    }).toThrow();
});