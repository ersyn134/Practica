$(document).ready(function () {
    const token = localStorage.getItem('access_token');
    const API_URL = 'http://localhost:8000/accounts/profile/';

    if (!token) {
        alert("Вы не авторизованы");
        window.location.href = "login.html";
        return;
    }

    // Получение данных профиля
    $.ajax({
        url: API_URL,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
        },
        success: function (data) {
            $("#first_name").text(data.first_name);
            $("#last_name").text(data.last_name);
            $("#email").text(data.email);
            $("#username").text(data.username);
        },
        error: function () {
            alert("Ошибка загрузки профиля");
        }
    });

    // Удаление аккаунта
    $("#delete-btn").click(function () {
        if (!confirm("Вы уверены, что хотите удалить аккаунт?")) return;

        $.ajax({
            url: API_URL,
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token,
            },
            success: function () {
                alert("Аккаунт удален");
                localStorage.clear();
                window.location.href = "register.html";
            },
            error: function () {
                alert("Ошибка при удалении");
            }
        });
    });

    // Выход
    $("#logout-btn").click(function () {
        localStorage.clear();
        window.location.href = "login.html";
    });
});
