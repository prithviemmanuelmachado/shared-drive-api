---
layout: default
title: Documentation for Shared Drive API
---

<h5>Register a user</h5>
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

<h5>User login</h5>
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

<h5>Admin login</h5>
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