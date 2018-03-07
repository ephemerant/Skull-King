// Maintain the game state
function Game(numPlayers) {
    // Deal n cards to all players from a new deck
    function distributeCards(n) {
        state.deck = Deck();

        state.players.forEach(function (player) {
            player.hand = state.deck.drawCards(n);
        });
    }

    // Play the game
    function play() {
        // Play 10 rounds
        for (var i = 1; i <= 10; i++) {
            var round = Round(state);
            state.rounds.push(round);

            // Rotate starting player
            state.startingPlayer = (state.startingPlayer + 1) % numPlayers;
        }
    }

    // Create the game state object
    var state = {
        deck: null,
        players: [],
        rounds: [],
        distributeCards: distributeCards,
        play: play,
        startingPlayer: Math.floor(Math.random() * numPlayers)
    };

    // Generate players
    for (var i = 1; i <= numPlayers; i++)
        state.players.push(Player(i));

    return state;
}