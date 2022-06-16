---
layout: default
title: Documentation for Shared Drive API
---

<h4>Register a user</h4>
<table>
    <tr>
        <td>
            Path 
        </td>
        <td>
            /user/register
        </td>
    </tr>
    <tr>
        <td>
            Request Type 
        </td>
        <td>
            POST
        </td>
    </tr>
    <tr>
        <td>
            Expected Payload 
        </td>
        <td>
            {
                "firstName": "",
                "lastName": "",
                "username": "",
                "contactNumber": "",
                "email": "",
                "password": ""
            }
        </td>
    </tr>
    <tr>
        <td>
            Token 
        </td>
        <td>
            Not required
        </td>
    </tr>
    <tr>
        <td>
            Success Status
        </td>
        <td>
            200, OK
        </td>
    </tr>
    <tr>
        <td>
            Success message 
        </td>
        <td>
            User successfully created. Please login
        </td>
    </tr>
    <tr>
        <td>
            Possible failure codes
        </td>
        <td>
            400(Bad Request), 500(Internal Server Error)
        </td>
    </tr>
</table>

<h4>User login</h4>
<table>
    <tr>
        <td>
            Path 
        </td>
        <td>
            /user/userLogin
        </td>
    </tr>
    <tr>
        <td>
            Request Type 
        </td>
        <td>
            POST
        </td>
    </tr>
    <tr>
        <td>
            Expected Payload 
        </td>
        <td>
            {
                "username": "",
                "password": ""
            }
        </td>
    </tr>
    <tr>
        <td>
            Token 
        </td>
        <td>
            Not required
        </td>
    </tr>
    <tr>
        <td>
            Success Status
        </td>
        <td>
            200, OK
        </td>
    </tr>
    <tr>
        <td>
            Success body 
        </td>
        <td>
            JWT token
        </td>
    </tr>
    <tr>
        <td>
            Possible failure codes
        </td>
        <td>
            400(Bad Request), 500(Internal Server Error)
        </td>
    </tr>
</table>

<h4>Admin login</h4>
<table>
    <tr>
        <td>
            Path 
        </td>
        <td>
            /user/adminLogin
        </td>
    </tr>
    <tr>
        <td>
            Request Type 
        </td>
        <td>
            POST
        </td>
    </tr>
    <tr>
        <td>
            Expected Payload 
        </td>
        <td>
            {
                "email": "",
                "password": ""
            }
        </td>
    </tr>
    <tr>
        <td>
            Token 
        </td>
        <td>
            Not required
        </td>
    </tr>
    <tr>
        <td>
            Success Status
        </td>
        <td>
            200, OK
        </td>
    </tr>
    <tr>
        <td>
            Success body 
        </td>
        <td>
            JWT token
        </td>
    </tr>
    <tr>
        <td>
            Possible failure codes
        </td>
        <td>
            400(Bad Request), 500(Internal Server Error)
        </td>
    </tr>
</table>

<h4>Check admin privilages</h4>
<table>
    <tr>
        <td>
            Path 
        </td>
        <td>
            /user/isAdminLoggedIn
        </td>
    </tr>
    <tr>
        <td>
            Request Type 
        </td>
        <td>
            GET
        </td>
    </tr>
    <tr>
        <td>
            Expected Payload 
        </td>
        <td>
            None
        </td>
    </tr>
    <tr>
        <td>
            Token 
        </td>
        <td>
            Pass in header
        </td>
    </tr>
    <tr>
        <td>
            Success Status
        </td>
        <td>
            200, OK
        </td>
    </tr>
    <tr>
        <td>
            Success body 
        </td>
        <td>
            true or false based on if an admin is logged in
        </td>
    </tr>
    <tr>
        <td>
            Possible failure codes
        </td>
        <td>
            400(Bad Request), 500(Internal Server Error)
        </td>
    </tr>
</table>

<h4>Get username</h4>
<table>
    <tr>
        <td>
            Path 
        </td>
        <td>
            /user/getUsername
        </td>
    </tr>
    <tr>
        <td>
            Request Type 
        </td>
        <td>
            GET
        </td>
    </tr>
    <tr>
        <td>
            Expected query parameter 
        </td>
        <td>
            id (user id)
        </td>
    </tr>
    <tr>
        <td>
            Token 
        </td>
        <td>
            Pass in header
        </td>
    </tr>
    <tr>
        <td>
            Success Status
        </td>
        <td>
            200, OK
        </td>
    </tr>
    <tr>
        <td>
            Success body 
        </td>
        <td>
            {
                "username" : ""
            }
        </td>
    </tr>
    <tr>
        <td>
            Possible failure codes
        </td>
        <td>
            400(Bad Request), 500(Internal Server Error)
        </td>
    </tr>
</table>

<h4>Create a route</h4>
<table>
    <tr>
        <td>
            Path 
        </td>
        <td>
            /route/createRoute
        </td>
    </tr>
    <tr>
        <td>
            Request Type 
        </td>
        <td>
            POST
        </td>
    </tr>
    <tr>
        <td>
            Expected body 
        </td>
        <td>
            {
                "vehicle" : "",
                "noOfSeats" : 0,
                timeOfDeparture: "",
                fromLocation: {
                    type: 'Point',
                    coordinates: [lng, lat],
                    address: ""
                },
                toLocation:{
                    type: 'Point',
                    coordinates: [lng, lat],
                    address: ""
                },
                daysOfTravel: [""]
            }
        </td>
    </tr>
    <tr>
        <td>
            Token 
        </td>
        <td>
            Pass in header
        </td>
    </tr>
    <tr>
        <td>
            Success Status
        </td>
        <td>
            200, OK
        </td>
    </tr>
    <tr>
        <td>
            Success message 
        </td>
        <td>
            Route created successfully
        </td>
    </tr>
    <tr>
        <td>
            Possible failure codes
        </td>
        <td>
            400(Bad Request), 500(Internal Server Error)
        </td>
    </tr>
</table>

<h4>Get all routes close to my geolocation</h4>
<table>
    <tr>
        <td>
            Path 
        </td>
        <td>
            /route/getRoutesByProximity
        </td>
    </tr>
    <tr>
        <td>
            Request Type 
        </td>
        <td>
            GET
        </td>
    </tr>
    <tr>
        <td>
            Expected query parameteres 
        </td>
        <td>
            lat, lng
        </td>
    </tr>
    <tr>
        <td>
            Token 
        </td>
        <td>
            Pass in header
        </td>
    </tr>
    <tr>
        <td>
            Success Status
        </td>
        <td>
            200, OK
        </td>
    </tr>
    <tr>
        <td>
            Success body 
        </td>
        <td>
            [
                {
                    "fromAddress" : "",
                    "toAddress" : "",
                    "daysOfTravel" : [""],
                    "timeOfDeparture" : "",
                    "noOfSeats" : 0,
                    "noOfAvailableSeats" : 0,
                    "createdBy" : "route.createdBy",
                    "toCoords" : {
                        type: 'Point',
                        coordinates: [lng, lat],
                        address: ""
                    },
                    "fromCoords" : {
                        type: 'Point',
                        coordinates: [lng, lat],
                        address: ""
                    },
                    "routeId" : ""
                }
            ]
        </td>
    </tr>
    <tr>
        <td>
            Possible failure codes
        </td>
        <td>
            400(Bad Request), 500(Internal Server Error)
        </td>
    </tr>
</table>

<h4>Request to join a route</h4>
<table>
    <tr>
        <td>
            Path 
        </td>
        <td>
            /request/createRequest
        </td>
    </tr>
    <tr>
        <td>
            Request Type 
        </td>
        <td>
            POST
        </td>
    </tr>
    <tr>
        <td>
            Expected body 
        </td>
        <td>
            {
                "routeId": "",
                "lng": 0,
                "lat": 0,
                "author": ""
            }
        </td>
    </tr>
    <tr>
        <td>
            Token 
        </td>
        <td>
            Pass in header
        </td>
    </tr>
    <tr>
        <td>
            Success Status
        </td>
        <td>
            200, OK
        </td>
    </tr>
    <tr>
        <td>
            Success message 
        </td>
        <td>
            Request has been sent. Please wait for response
        </td>
    </tr>
    <tr>
        <td>
            Possible failure codes
        </td>
        <td>
            400(Bad Request), 500(Internal Server Error)
        </td>
    </tr>
</table>

<h4>Get the pickup location</h4>
<table>
    <tr>
        <td>
            Path 
        </td>
        <td>
            /request/getPickupLocation
        </td>
    </tr>
    <tr>
        <td>
            Request Type 
        </td>
        <td>
            POST
        </td>
    </tr>
    <tr>
        <td>
            Expected query parameters 
        </td>
        <td>
            id (route id)
        </td>
    </tr>
    <tr>
        <td>
            Token 
        </td>
        <td>
            Pass in header
        </td>
    </tr>
    <tr>
        <td>
            Success Status
        </td>
        <td>
            200, OK
        </td>
    </tr>
    <tr>
        <td>
            Success body 
        </td>
        <td>
            [0, 0] (lng, lat)
        </td>
    </tr>
    <tr>
        <td>
            Possible failure codes
        </td>
        <td>
            400(Bad Request), 500(Internal Server Error)
        </td>
    </tr>
</table>

<h4>Accept or reject request</h4>
<table>
    <tr>
        <td>
            Path 
        </td>
        <td>
            /request/setRequestStatus
        </td>
    </tr>
    <tr>
        <td>
            Request Type 
        </td>
        <td>
            PUT
        </td>
    </tr>
    <tr>
        <td>
            Expected query parameters 
        </td>
        <td>
            status (accepted, rejected), id (route id), notifId (id of the notification), createdFor (the user id of the user who created the request)
        </td>
    </tr>
    <tr>
        <td>
            Token 
        </td>
        <td>
            Pass in header
        </td>
    </tr>
    <tr>
        <td>
            Success Status
        </td>
        <td>
            200, OK
        </td>
    </tr>
    <tr>
        <td>
            Success message 
        </td>
        <td>
            Request has been accepted/rejected
        </td>
    </tr>
    <tr>
        <td>
            Possible failure codes
        </td>
        <td>
            400(Bad Request), 500(Internal Server Error)
        </td>
    </tr>
</table>

