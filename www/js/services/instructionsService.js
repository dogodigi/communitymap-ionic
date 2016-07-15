angular.module('starter').factory('InstructionsService', [ function() {

  var instructionsObj = {};

  /**
   * A popup that can be displayed to users on first start of the application.
   * set the text and init seen: false to make active.
   */
  instructionsObj.instructions = {
    newLocations : {
      text : 'This is a popup that can be used to greet users and provide them with basic instructions',
      seen : true
    }
  };

  return instructionsObj;

}]);
