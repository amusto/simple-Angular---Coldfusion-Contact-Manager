	// create the module and re-name it contactsApp
	var contactsApp = angular.module('contactsApp', ['ngRoute']);


	// configure our routes
	contactsApp.config(function($routeProvider, $locationProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/list_contacts.html',
				controller  : 'mainController'
			})

			// route for the contact add/edit page
			.when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			})

            .when('/editContact/:contactId', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });

        // use the HTML5 History API
        $locationProvider.html5Mode(true);

	});

    // Learned about the Angular cycle and how it's best to use apply
	// create the controller and inject Angular's $scope
	contactsApp.controller('mainController', function($scope, $rootScope, $route, $routeParams, $location) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;

        $scope.loadContacts = function(){
            console.log('loading');

            $.getJSON('contacts.cfc?method=getContacts',{},function(data){
                $scope.$apply(function(){
                    $scope.contacts = data;
                    console.log($scope.contacts);
                });
            });
        };

        $scope.getContact = function(contactId){
            $scope.contactId = contactId;
            $.getJSON('contacts.cfc?method=getContacts',{},function(data){
                $scope.$apply(function(){
                    $scope.contacts = data;
                    $rootScope.contact = $scope.contacts[$scope.contactId];
                    $rootScope.contact.id = $scope.contactId;
                    $rootScope.contact.exists = 1;
                });
            });

        };

        //show contactDetails
        $scope.showContactDetails = {};
        $scope.showContactDetails = function(index){
            $scope.showContactDetails[index] = !$scope.showContactDetails[index];
        };


        $scope.deleteContact = function(index){
            console.log(index);
            var thisContact = {};
            thisContact = $scope.contacts[index];
            thisContact.id = index;

            $.post( "contacts.cfc?method=deleteContact", { id:thisContact.id }, function( data ) {
                $scope.loadContacts();
             });
        };

	});

	contactsApp.controller('contactController', function($scope, $rootScope, $route, $routeParams, $location) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
        $scope.loadContacts();

        if(typeof $scope.$routeParams.contactId=="undefined"){
            $rootScope.contact = {
                "fullname": '',
                "phone": '',
                "email": '',
                "exists": 0
            };
        }else{
            contactId = $scope.$routeParams.contactId;
            $scope.getContact(contactId);

        }

        $scope.updateContact = function(){
            thisContact = $rootScope.contact;

            if(thisContact.exists==0){
                console.log('Add contact');
                $.post( "contacts.cfc?method=addContact", { id:thisContact.id, fullname:thisContact.fullname, email:thisContact.email, phone:thisContact.phone }, function( data ) {
                    $scope.loadContacts();
                    $location.path("/");
                })
            } else {
                console.log('Updating contact');
                $.post( "contacts.cfc?method=updateContact", { id:thisContact.id, fullname:thisContact.fullname, email:thisContact.email, phone:thisContact.phone }, function( data ) {
                    $scope.loadContacts();
                    $location.path("/");
                })
            }
        }
		
		$scope.cancelContact = function(){
                    $location.path("/");
			}

    });