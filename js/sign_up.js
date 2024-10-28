"use strict";

$(document).ready( () => {

    $("#submit").click( () => { 
        const email = $("#email_address").val();
        const password = $("#create_password").val();
        const verifyPassword = $("#verify_password").val();
        let isValid = True;

        if (password == verifyPassword) {
            alert("Passwords match")
        } else {
            alert("Passwords don't match")
        }
    }

)
})

