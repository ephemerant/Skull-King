// Maintain the game state
function Game(numPlayers) {        
    var rounds = [];
    var players = [];
    var player = 0;
    var deck;

    // Generate players
    for (var i = 1; i <= numPlayers; i++)
        players.push(Player(i));

    // Randomly rotate player order
    players = players.splice(Math.floor(Math.random() * players.length)).concat(players);

    // Deal n cards to all players from a new deck
    function distributeCards(n) {
        deck = Deck();

        players.forEach(function(player) {
            player.hand = deck.drawCards(n);
        });
    }

    // Create the game state object
    var state = {
        deck: deck,
        players: players,
        rounds: rounds,
        distributeCards: distributeCards,
        play: function() {
            // TODO: Loop 10 times...
            var round = Round(state);
            rounds.push(round);
        }
    };

    return state;
}

// Create one of the 10 rounds
function Round(state) {
    var round = state.rounds.length + 1 + 4;
    console.log('ROUND', round);
    console.log();

    state.deck = Deck();
    state.distributeCards(round);
    
    var winningPlayer;
    var winningCard;
    var suit;
    var playedCards = [];    

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
    function play(player, card) {
        if (!suit)
            suit = card.suit;

        if (!winningPlayer || compareCards(winningCard, card) !== winningCard) {
            winningPlayer = player;
            winningCard = card;
        }

        // Remove the card from the player's hand
        player.hand = player.hand.filter(function(x) {
            return card !== x;
        });

        playedCards.push(card);
    }

    // Play out all turns
    while (round--) {
        state.players.forEach(function(player) {
            // Determine playable cards
            var playableCards = [];

            if (winningCard && suit) {
                player.hand.forEach(function(card) {
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
            console.log('>', cardPlayed.name);
            console.log('PLAYABLE CARDS:');
            console.log(playableCards.map(function(card) { return card.name; }));
            console.log('HAND:');
            console.log(player.hand.map(function(card) { return card.name; }));
            console.log();

            play(player, cardPlayed);            
        });
        
        console.log('WINNER:', winningPlayer.name);
        console.log(winningCard.name);

        // Reset state for next turn
        winningPlayer = null;
        winningCard = null;
        suit = null;
        playedCards = [];   

        // TODO: Make winner go first on next round
        break;
    }
}

// Create a player
function Player(i) {
    return {
        name: 'Player ' + i,
        order: i,
        hand: []
    };
}

// Create a shuffled deck
function Deck() {
    var suits = ['Yellow', 'Green', 'Purple', 'Black'];
    
    var deck = [];
    
    // Shuffles the deck
    function shuffle(deck) {
        var newDeck = [];
    
        while (deck.length)
            newDeck = newDeck.concat(deck.splice(Math.floor(Math.random() * deck.length), 1));
    
        return newDeck;
    }
    
    // Get a card's value
    function getValue(suit, number) {
        var suitValue = 0;
    
        switch(suit) {
            case 'Black':
                suitValue = 14; break;
            case 'Pirate':
            case 'Tigress':
                suitValue = 29; break;
            case 'Skull King':
                suitValue = 30; break;
        }
    
        return suitValue + (number || 0);
    }
    
    // Create a card object
    function Card(suit, number) {
        return {
            name: suit + (number ? ' ' + number : ''),
            namedCard: suits.indexOf(suit) === -1,
            suit: suit === 'Escape' ? null : suit, // Escape doesn't set the suit
            value: getValue(suit, number)
        };
    }
    
    // +56 suited cards
    suits.forEach(function(suit) {
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
    deck =  shuffle(deck);

    return {
        cards: deck,
        drawCards: function(n) { return deck.splice(0, n); }
    }
}

// Create a new game
var game = Game(5);

game.play();