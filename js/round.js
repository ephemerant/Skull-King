// Create one of the 10 rounds
function Round(state) {
    var round = state.rounds.length + 1;

    console.log('------------------');
    console.log('%cROUND ' + round, 'font-weight: bold;');

    state.distributeCards(round);

    var startingPlayer = state.startingPlayer;
    var currentTurn = 1;

    function Random(a, b) { // Returns a random integer between a and b, inclusive
        return Math.floor(Math.random() * (b - a + 1) + a);
    }

    // Let all players make a bet on how many tricks they will win
    function placeBets() {
        state.players.forEach(function (player) {
            var randomBet = Random(0, round);
            var averageBet = Math.floor(round / state.players.length + 0.5);
            var averageBetWithVariance = Math.max(0, Random(averageBet - 1, averageBet + 1));
            player.bet = averageBetWithVariance;
            player.tricks = 0;
        });
    }

    placeBets();

    // Play out all turns
    while (round--) {
        console.log('------------------');
        console.log('%cTURN ' + (currentTurn++), 'font-weight: bold;');
        console.log('------------------');

        var orderedPlayers = state.players.slice(0);
        orderedPlayers = orderedPlayers.splice(startingPlayer).concat(orderedPlayers);

        var turn = Turn(orderedPlayers);

        turn.winningPlayer.tricks++;

        console.log('%cWinner: ' + turn.winningPlayer.name + ' with a ' + turn.winningCard.name, 'font-weight: bold;');
        console.log('');

        // Make winner go first on next round
        startingPlayer = turn.winningPlayer.order - 1;
    }

    // Update scores based on how well the players met their bets
    function updateScores() {
        state.players.forEach(function (player) {
            if (player.bet === player.tricks) {
                if (player.bet > 0)
                    player.score += player.bet * 20;
                else
                    player.score += (state.rounds.length + 1) * 10;
            }
            else {
                if (player.bet > 0)
                    player.score -= Math.abs(player.bet - player.tricks) * 10;
                else
                    player.score -= (state.rounds.length + 1) * 10;
            }
        });
    }

    updateScores();
}