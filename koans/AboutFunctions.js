  describe("About Functions", function() {

  it("should declare functions", function() {

    function add(a, b) {
      return a + b;
    }

    expect(add(1, 2)).toBe(3);
  });

  it("should know internal variables override outer variables", function () {
    var message = "Outer";

    function getMessage() {
      return message;
    }

    function overrideMessage() {
      var message = "Inner";
      return message;
    }

    expect(getMessage()).toBe('Outer');
    expect(overrideMessage()).toBe('Inner');
    expect(message).toBe('Outer');
  });

  it("should have lexical scoping", function () {
    var variable = "top-level";
    function parentfunction() {
      var variable = "local";
      function childfunction() {
        return variable;
      }
      return childfunction();
    }
    expect(parentfunction()).toBe("local");
  });

  it("should use lexical scoping to synthesise functions", function () {
                                  ///3
                                  ///5
    function makeMysteryFunction(makerValue){
                                    // 3          //10
                                    // 5          //5
      var newFunction = function doMysteriousThing(param) {
                //3     +     10  = 13
                //5     +     5   = 10
        return makerValue + param;
      };

      return newFunction;
    }
    // passing 3 to make
    var mysteryFunction3 = makeMysteryFunction(3);
    // passing 5 to make
    var mysteryFunction5 = makeMysteryFunction(5);
        //  passing 10 to doMyst    //  passing 5 to doMyst
    expect(mysteryFunction3(10) + mysteryFunction5(5)).toBe(23);
  });

  it("should allow extra function arguments", function () {

    function returnFirstArg(firstArg) {
      return firstArg;
    }

    /////////////////////
    expect(returnFirstArg("first", "second", "third")).toBe('first');

    function returnSecondArg(firstArg, secondArg) {
      return secondArg;
    }
                                                //no second argument defined
    expect(returnSecondArg("only give first arg")).toBe(undefined);

    //////////////////////
    function returnAllArgs() {
      var argsArray = [];
    //    i= index 0  less than the length of array ; count up
      for (var i = 0; i < arguments.length; i += 1) {
    // pushing arguments into each index of the array, also defining arguments[i]= value of that index
        argsArray.push(arguments[i]);
      }
    // turning array into a string (separator is provided even though default is comma)
      return argsArray.join(",");
    }
    //  passing strings as the arguments, function called pushes into each index of argsArray
    expect(returnAllArgs("first", "second", "third")).toBe("first,second,third");
  });

  ///////////////

  it("should pass functions as values", function () {

    var appendRules = function (name) {
      return name + " rules!";
    };

    var appendDoubleRules = function (name) {
      return name + " totally rules!";
    };
                                    //METHOD
    var praiseSinger = { givePraise: appendRules };
        // targeting property of object which is a method
    expect(praiseSinger.givePraise("John")).toBe("John rules!");

    praiseSinger.givePraise = appendDoubleRules;
    expect(praiseSinger.givePraise("Mary")).toBe("Mary totally rules!");

  });


});
