function Turn(players) {
    var winningPlayer;
    var winningCard;
    var suit;
    var playedCards = [];

    // See which card is better
    function compareCards(a, b) {
        // b not in suit
        if (b.suit != suit && ['Yellow', 'Green', 'Purple'].indexOf(b.suit) !== -1)
            return a;
        // b worse than a
        else if (a.value >= b.value)
            return a;
        // b better than a
        else
            return b;
    }

    // Play a card for a player
    function playCard(player, card) {
        if (!suit)
            suit = card.suit;

        if (!winningPlayer || compareCards(winningCard, card) !== winningCard) {
            winningPlayer = player;
            winningCard = card;
        }

        // Remove the card from the player's hand
        player.hand = player.hand.filter(function (x) {
            return card !== x;
        });

        playedCards.push(card);
    }

    // Let all players make a move in order
    players.forEach(function (player) {
        var cardPlayed = player.turn(winningCard, suit);

        playCard(player, cardPlayed);
    });

    return {
        winningPlayer: winningPlayer,
        winningCard: winningCard
    };
}