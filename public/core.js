// public/core.js
var myCal = angular.module('myCal', []);

function mainController($scope, $http) {
    $scope.formData = {};

    //------START end END time select
    $scope.startTimeOptions = [
        { name: 'Start Time', value: '1' },
        { name: '1:00 AM', value: '2' },
        { name: '2:30 AM', value: '3' },
        { name: '3:00 AM', value: '4' },
    ];
    $scope.modelStartTimeOptions = $scope.startTimeOptions[0];

      $scope.endTimeOptions = [
        { name: 'End Time', value: '1' },
        { name: '1:00 AM', value: '2' },
        { name: '2:30 AM', value: '3' },
        { name: '3:00 AM', value: '4' },
    ];
    $scope.modelEndTimeOptions = $scope.endTimeOptions[0];

    //------date picker
    $(function() {
        $( "#datepicker" ).datepicker();
      });
    //-------Toggle view
    $scope.toggleView = function() {
        var el =document.getElementById('view-container')
        var active = el.getAttribute('data-active')
        el.setAttribute("data-active", active === 'event-list' ? 'event-grid' : 'event-list')
    }

//----------------------------data
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