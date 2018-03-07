// Create a card object
function Card(suit, number) {
    // Get a card's value
    function getValue() {
        var suitValue = 0;

        switch (suit) {
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

    return {
        name: suit + (number ? ' ' + number : ''),
        namedCard: ['Yellow', 'Green', 'Purple', 'Black'].indexOf(suit) === -1,
        suit: suit === 'Escape' ? null : suit, // Escape doesn't set the suit
        value: getValue()
    };
}