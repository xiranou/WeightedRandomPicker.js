# WeightedRandomPicker.js
    //parameter: {stuffToPick: weight}
    var weightedValues = {"A": 0.1, "B": 0.7, "C": 0.7};

    //without init
    //pickFrom accepts weightedValue and options
    var result = WeightedRandomPicker.pickFrom(weightedValues, {times: 2, uniq: true});

    //with init
    var picker = new WeightedRandomPicker(weightedValues);

    //default number of pick is 1, will return one randomly picked key from param object
    var pick = picker.randomPick();

    //will return 10 picks in an Array
    var picks = picker.randomPick({times: 10});

    //will return 3 unique picks
    var uniqPicks = picker.randomPick({times: 3, uniq: true});

    //will throw error, unique picks cannot have times more than its number of keys
    var invalidPicks = picker.randomPick({times: 4, uniq: true});
