// Create a player
function Player(i, name) {
    // Play a legal card based on the current turn
    function turn(winningCard, suit) {
        // Determine playable cards
        var playableCards = [];

        if (winningCard && suit) {
            player.hand.forEach(function (card) {
                // If its suit matches or it's a named card or the suit to match isn't a color
                if (card.suit === suit || card.namedCard || ['Yellow', 'Green', 'Purple', 'Black'].indexOf(suit) === -1)
                    playableCards.push(card);
            });
        }

        // Let them play any card if they're not on suit and don't have a named card
        if (!playableCards.length)
            playableCards = player.hand;

        // TODO: Play a card
        var cardPlayed = playableCards[0];

        console.log(player.name);
        console.log('Hand:', player.hand.map(function (card) { return card.name; }));
        console.log('Playable Cards:', playableCards.map(function (card) { return card.name; }));
        console.log('>', cardPlayed.name);
        console.log('------------------');

        return cardPlayed;
    }

    var player = {
        name: name || ('Player ' + i),
        order: i,
        hand: [],
        human: name != null,
        turn: turn
    };

    return player;
}