angular.module('svyFullcalendar2',['servoy']).directive('svyFullcalendar2', function() {  
    return {
      restrict: 'E',
      scope: {
       	model: "=svyModel",
       	handlers: "=svyHandlers",
        api: "=svyApi",
        servoyApi: "=svyServoyapi"
      },
      link:  function($scope, $element, $attrs) {
      },
      templateUrl: 'fullcalendarcomponent2/fullcalendar2/fullcalendar.html'
    };
  })
  
  
  
