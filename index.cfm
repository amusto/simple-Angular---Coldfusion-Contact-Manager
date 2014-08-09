<cfif isdefined("url.resetApp")>
    <cfscript>
        application.contacts = [
            {
                "fullname": "Kasey Koch",
                "email": "DKahle@in.net",
                "phone": "1-689-674-937"
            },
            {
                "fullname": "Effram Koehn",
                "email": "NLeeman@mattis.com",
                "phone": "816-800-8094"
            },
            {
                "fullname": "Colleen Harkey",
                "email": "EFrutos@tempor.com",
                "phone": "513-643-2883"
            },
            {
                "fullname": "Guy Craig",
                "email": "PDelatorre@risus.net",
                "phone": "106-311-0309"
            },
            {
                "fullname": "Bernard Young",
                "email": "BGibson@libero.net",
                "phone": "428-700-7597"
            },
            {
                "fullname": "Isabel Reviews",
                "email": "IMortimore@et.com",
                "phone": "278-884-7653"
            },
            {
                "fullname": "Sukanya Alua",
                "email": "IAbney@vestibulum.org",
                "phone": "932-521-9966"
            }
        ];
    </cfscript>
    <script>
        alert('Contacts reloaded');
        window.location='/';
    </script>
    <!--- Add $apply to JS side --->

</cfif>



<!DOCTYPE html>

<!-- define angular app -->
<html ng-app="contactsApp">

<head>
  <base href="/">
  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" />
  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.0/css/font-awesome.css" />

  <script src="http://code.jquery.com/jquery-2.1.1.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.10/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.10/angular-route.js"></script>
  <script src="script.js"></script>


  <style>
      p {
          font-size:12px;
      }

      table tr td {
          font-size:14px;
      }
  </style>

</head>

<!-- define angular controller -->
<body ng-controller="mainController">

  <nav class="navbar navbar-default">
    <div class="container">
      <div class="navbar-header">
        <a class="navbar-brand" href="/">Contacts application</a>
      </div>

    </div>
  </nav>

  <div id="main">

    <!-- angular templating -->
	<!-- this is where content will be injected -->
    <div ng-view></div>
    
  </div>
  
  <footer class="text-center">
    <p>Armando Musto | armando.musto@gmail.com</p>
  </footer>
  
</body>

</html>
