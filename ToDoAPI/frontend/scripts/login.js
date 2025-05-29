$(document).ready(function(){
    $("#login-form").submit(function(event){
        event.preventDefault();
        $.ajax({
            url:"http://localhost:8000/accounts/login/",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({
                username: $("#username").val(),
                password: $("#password").val(),
            }),
            success: function(response) {
                window.location.href = "profile.html";
                localStorage.setItem('access_token', response.access);
            },
        });
    });
});