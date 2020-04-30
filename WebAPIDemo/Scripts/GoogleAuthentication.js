﻿/// <reference path="jquery-3.4.1.min.js" />


function getAccessToken() {
    if (location.hash) {
        if (location.hash.split('access_token=')) {
            var accessToken = location.hash.split('access_token=')[1].split('&')[0];
            if (accessToken) {
                isUserRegistered(accessToken);
            }
        }
    }
}
function isUserRegistered(accessToken) {
    $.ajax({
        url: '/api/Account/UserInfo',
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (response) {
            if (response.HasRegistered) {
                sessionStorage.setItem("accessToken", accessToken);
                sessionStorage.setItem("userName", response.Email);
                window.location.href = "Data.html";
            }
            else {
                // Pass the login provider (Facebook or Google)
                signupExternalUser(accessToken, response.LoginProvider);
            }
        }
    });
}

function signupExternalUser(accessToken, provider) {
    $.ajax({
        url: '/api/Account/RegisterExternal',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        success: function () {
            // Use the provider parameter value instead of
            // hardcoding the provider name
            window.location.href = "/api/Account/ExternalLogin?provider=" + provider + "&response_type=token&client_id=self&redirect_uri=http%3a%2f%2flocalhost%3a61358%2fLogin.html&state=GerGr5JlYx4t_KpsK57GFSxVueteyBunu02xJTak5m01";
        }
    });
}
