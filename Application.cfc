<cfcomponent displayname="code_challenge">
	
	<cfscript>
		this.name = "Code Challenge";
		this.setclientcookies="yes";
		this.sessionmanagement="yes";
		this.sessiontimeout= CreateTimeSpan(0,0,60,0);
        this.applicationtimeout = createtimespan(5,0,0,0);
	</cfscript>


</cfcomponent>