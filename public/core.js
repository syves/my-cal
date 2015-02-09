// public/core.js
var myCal = angular.module('myCal', []);

function mainController($scope, $http) {
    $scope.formData = {};
    //$scope.visible = true;
    $(function() {
        $( "#datepicker" ).datepicker();
      });

    $scope.toggleView = function() {
        //$scope.visible = !$scope.visible;
        var el =document.getElementById('view-container')
        var active = el.getAttribute('data-active')
        el.setAttribute("data-active", active === 'event-list' ? 'event-grid' : 'event-list')
    }

    // when landing on the page, get all todos and show them

    $http.get('/api/events')
        .success(function(data) {
            $scope.events = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createEvent = function() {
        $http.post('/api/events', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.events = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteEvent = function(id) {
        $http.delete('/api/events/' + id)
            .success(function(data) {
                $scope.events = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}