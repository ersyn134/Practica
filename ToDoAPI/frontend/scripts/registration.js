$(document).ready(function(){
    $("#registration-form").submit(function(event){
        event.preventDefault();
        $.ajax({
            url:"http://localhost:8000/accounts/register/",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({
                first_name: $("#first_name").val(),
                last_name: $("#last_name").val(),
                username: $("#username").val(),
                email: $("#email").val(),
                password: $("#password1").val(),
                password2: $("#password2").val()
            }),
            success: function(response) {
                alert("Registration successful!");
                window.location.href = "login.html";
            },
        });
    });
});