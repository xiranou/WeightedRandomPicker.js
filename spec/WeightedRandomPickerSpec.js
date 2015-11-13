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
    picker.weightedValues["D"] = 1.0;
    expect(picker.weightedValues).not.toEqual(weightedValues);
  });
});