// Create one of the 10 rounds
function Round(state) {
    var round = state.rounds.length + 1;

    console.log('------------------');
    console.log('%cROUND ' + round, 'font-weight: bold;');

    state.deck = Deck();
    state.distributeCards(round);

    var startingPlayer = state.startingPlayer;

    var currentTurn = 1;

    // Play out all turns
    while (round--) {
        console.log('------------------');
        console.log('%cTURN ' + (currentTurn++), 'font-weight: bold;');
        console.log('------------------');

        var orderedPlayers = state.players.slice(0);
        orderedPlayers = orderedPlayers.splice(startingPlayer).concat(orderedPlayers);

        var turn = Turn(orderedPlayers);

        console.log('%cWinner: ' + turn.winningPlayer.name + ' with a ' + turn.winningCard.name, 'font-weight: bold;');
        console.log('');
        
        // Make winner go first on next round
        startingPlayer = turn.winningPlayer.order - 1;
    }
}