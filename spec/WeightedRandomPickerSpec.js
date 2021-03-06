describe('Can initiate', function() {
  it('should initiate with empty weightedValues', function() {
    var picker = new WeightedRandomPicker();
    expect(picker.weightedValues).toEqual({});
  });
  it('should initiate with the given object', function() {
    var weightedValues = {"A": 0.5, "B": 0.5, "C": 0.8};
    var picker = new WeightedRandomPicker(weightedValues);
    expect(picker.weightedValues).toEqual(weightedValues);
  });
  it('should initiate with a clone of the given object', function() {
    var weightedValues = {"A": 0.5, "B": 0.5, "C": 0.8};
    var picker = new WeightedRandomPicker(weightedValues);
    expect(picker.weightedValues).not.toBe(weightedValues);
  });
});

describe('Pick randomly by given weight', function() {
  it('should pick with only one weight', function() {
    expect(WeightedRandomPicker.pickFrom({"A": 0.2}, {times: 1, uniq: true})).toEqual(["A"]);
  });
  it('should pick by the given times', function() {
    var weightedValues = {"A": 0.2, "B": 0.1, "C": 0.5};
    var picker = new WeightedRandomPicker(weightedValues);
    expect(picker.randomPick({times: 3}).length).toEqual(3);
  });
  it('should never pick a key with 0 weight value', function() {
    var weightedValues = {"A": 0, "B": 0.1, "C": 0.5};
    var picker = new WeightedRandomPicker(weightedValues);
    expect(picker.randomPick({times: 10})).not.toContain("A");
  });
  it('should return unique picks when uniq option is turn on', function() {
    var weightedValues = {"A": 0.8, "B": 0.1, "C": 0.5};
    var picker = new WeightedRandomPicker(weightedValues);
    var uniqPicks = picker.randomPick({times: 3, uniq: true});
    expect((new Set(uniqPicks)).size).toEqual(3);
  });
  it('should be able to uniq picks multiple times', function() {
    var weightedValues = {"A": 0.8, "B": 0.1, "C": 0.5, "D": 0.3};
    var picker = new WeightedRandomPicker(weightedValues);
    picker.randomPick({times: 4, uniq: true});
    picker.randomPick({times: 4, uniq: true});
    var picks = picker.randomPick({times: 4, uniq: true});
    expect((new Set(picks)).size).toEqual(4);
  });
  it('should pick low weighted items if all items has low/euqal weights', function() {
    var weightedValues = {"A": 0.1, "B": 0.1, "C": 0.1, "D": 0.1};
    var picker = new WeightedRandomPicker(weightedValues);
    var pick = picker.randomPick();
    expect(Object.keys(weightedValues)).toContain(pick[0]);
  });
  it('should be able to pick and with options without initiation', function() {
    var weightedValues = {"A": 0.5, "B": 0.1, "C": 0.7, "D": 0.7};
    var picks = WeightedRandomPicker.pickFrom(weightedValues, {times: 2, uniq: true});
    expect((new Set(picks)).size).toEqual(2);
  });
});