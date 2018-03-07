// Maintain the game state
function Game(numPlayers) {
    // Deal n cards to all players from a new deck
    function distributeCards(n) {
        state.deck = Deck();

        state.players.forEach(function (player) {
            player.hand = state.deck.drawCards(n);
        });
    }

    // Display the current scores
    function displayScores() {
        var table = [];

        state.players.forEach(function(player) {
            table.push({
                name: player.name,
                score: player.score,
                bet: player.bet,
                tricks: player.tricks
            })
        });

        console.table(table);
    }

    // Play the game
    function play() {
        // Play 10 rounds
        for (var i = 1; i <= 10; i++) {
            state.rounds.push(Round(state));
            state.startingPlayer = (state.startingPlayer + 1) % numPlayers; // Rotate starting player
            displayScores();
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