	// create the module and re-name it contactsApp
	var contactsApp = angular.module('contactsApp', ['ngRoute']);

	// configure our routes
	contactsApp.config(function($routeProvider, $locationProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/list_contacts.html',
				controller  : 'mainController'
			});

			// route for the contact add/edit page
        $routeProvider.when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			});

        $routeProvider.when('/editContact/:contactId', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });

        $routeProvider.otherwise( { redirectTo: '/'} );

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
            $.getJSON('http://blog.armandomusto.com/code_samples/coldfusion_angular_contact_manager/contacts.cfc?method=getContacts',{},function(data){
                $scope.$apply(function(){
                    $rootScope.contacts = data;
                });
            });
        };

        if(angular.isDefined($rootScope.contacts)){
            }
        else{
            $scope.loadContacts();
            console.log('reloading contacts from Coldfusion CFC now!');
        }

        $scope.getContact = function(contactId){
            $scope.contactId = contactId;
            $rootScope.contact = $scope.contacts[$scope.contactId];
            $rootScope.contact.id = $scope.contactId;
            $rootScope.contact.exists = "true";
        };

        //show contactDetails
        $scope.showContactDetails = {};
        $scope.showContactDetails = function(index){
            $scope.showContactDetails[index] = !$scope.showContactDetails[index];
        };


        $scope.deleteContact = function(index){
            console.log(index);
            var thisContact = {};
            thisContact = $rootScope.contacts[index];
            thisContact.id = index;
            $rootScope.contacts.splice(index, 1);
        };

	});

	contactsApp.controller('contactController', function($scope, $rootScope, $route, $routeParams, $location) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;

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
                $rootScope.contacts.push({ id:thisContact.id, fullname:thisContact.fullname, email:thisContact.email, phone:thisContact.phone });
                $location.path("/");
            } else {
                $rootScope.contacts[thisContact.id] = thisContact;
                $location.path("/");
            }
        }
		
		$scope.cancelContact = function(){
                    $location.path("/");
			}

    });