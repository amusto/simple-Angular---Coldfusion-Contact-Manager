<cfcomponent displayName="contacts" hints="I manage contacts">

<cffunction name="getContacts" access="remote" returnType="any">

    <cfif not isdefined("application.contacts")>
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
    </cfif>

        <cfset data = serializeJSON(application.contacts)>
        <cfcontent type="application/json" reset="true"><cfoutput>#data#</cfoutput>

</cffunction>


 <cffunction name="AddContact" returnformat="plain" access="remote" output="true" hint="Add a contact to the JSON array" >
    <cfargument name="fullName" type="any" required="yes">
    <cfargument name="phone" type="any" required="yes">
    <cfargument name="email" type="any" required="yes">
    <cfdump var="#arguments#">
    <cfdump var="#application#">

    <cfscript>
        newContact = {
            "fullname": "#arguments.fullname#",
            "email": "#arguments.email#",
            "phone": "#arguments.phone#"
        };
        ArrayAppend(application.contacts, newContact);
    </cfscript>

    <cfabort>

 </cffunction>

  <cffunction name="UpdateContact" returnformat="plain" access="remote" output="true" hint="Update contact in JSON array" >
     <cfargument name="id" type="any" required="yes">
     <cfargument name="fullName" type="any" required="yes">
     <cfargument name="phone" type="any" required="yes">
     <cfargument name="email" type="any" required="yes">

    <!--- Offset the array id since CF starts at number 1 where JS starts at 0 --->
    <cfset arguments.id = arguments.id+1>

    <cfscript>
        updatedContact = {
            "fullname": "#arguments.fullname#",
            "email": "#arguments.email#",
            "phone": "#arguments.phone#"
        };
        application.contacts[#arguments.id#] = updatedContact;
    </cfscript>

     <cfabort>

  </cffunction>

     <cffunction name="DeleteContact" returnformat="plain" access="remote" output="true" hint="Delete a contact from the contact list" >
        <cfargument name="id" type="any" required="yes">

            <!--- Offset the array id since CF starts at number 1 where JS starts at 0 --->
            <cfset arguments.id = arguments.id+1>

            <cfscript>
                ArrayDeleteAt(application.contacts, arguments.id);
            </cfscript>

     </cffunction>


</cfcomponent>