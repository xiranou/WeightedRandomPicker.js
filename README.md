# weightedRandomPicker.js
    //parameter: {stuffToPick: weight}
    var picker = new WeightedRandomPicker({"A": 0.1, "B": 0.7, "C": 0.7});

    //default number of pick is 1
    var pick = picker.randomPick();

    //will return 10 picks in an Array
    var picks = picker.randomPick({times: 10});