// Create a shuffled deck
function Deck() {
    var deck = [];

    // Shuffles the deck
    function shuffle(deck) {
        var newDeck = [];

        while (deck.length)
            newDeck = newDeck.concat(deck.splice(Math.floor(Math.random() * deck.length), 1));

        return newDeck;
    }

    // +56 suited cards
    ['Yellow', 'Green', 'Purple', 'Black'].forEach(function (suit) {
        for (var i = 1; i <= 14; i++)
            deck.push(Card(suit, i));
    });

    // +5 pirate cards
    for (var i = 1; i <= 5; i++)
        deck.push(Card('Pirate'));

    // +5 escape cards
    for (var i = 1; i <= 5; i++)
        deck.push(Card('Escape'));

    // +1 Tigress
    deck.push(Card('Tigress'));

    // +1 Skull King
    deck.push(Card('Skull King'));

    // Set up and return the deck object
    deck = shuffle(deck);

    return {
        cards: deck,
        drawCards: function (n) { return deck.splice(0, n); }
    }
}