//columnList 2d table with lower stacks of cards
//foundationList 2d table with four upper card places
//revealedCardStack top left stack with free cards

export const numMoves = function(columnList, foundationList, revealedCardStack) {
    var nummov=0;
    for (const column  of columnList) {
        revealedCard=revealedCardStack.pop();
        if (isDroppable(revealedCard, column[0]))
            {
                nummov+=1;
                revealedCardStack.push(revealedCard);
            }
            else
            {
                revealedCardStack.push(revealedCard);
            }
        for (const column1 of columnList) {
            if (isDroppable(column[0], column1[0]))
            {
                nummov+=1;
            }
        }
    }
    for (const column  of columnList) {
            for (const foundation of foundationList) {
                revealedCard=revealedCardStack.pop();
                if  (check4Stack(foundation, revealedCard))
                {
                    nummov+=1;
                    revealedCardStack.push(revealedCard);
                }
                else
                {
                    revealedCardStack.push(revealedCard);
                }
                if  (check4Stack(foundation, column[0]))
                {
                    nummov+=1;
                }
            }
    }
    return nummov;
  };


export const gameWinable = function(numMoves) {
    if (numMoves==0)
    {
        return false;
    }
    return true;
};