$(document).ready(function () {
    const token = localStorage.getItem('access_token');
    const API_URL = 'http://localhost:8000/accounts/profile/';

    if (!token) {
        alert("Вы не авторизованы");
        window.location.href = "login.html";
        return;
    }

    // Загрузка текущих данных профиля
    $.ajax({
        url: API_URL,
        method: "GET",
        headers: { "Authorization": "Bearer " + token },
        success: function (data) {
            $("#first_name").val(data.first_name);
            $("#last_name").val(data.last_name);
            $("#email").val(data.email);
            $("#username").val(data.username);
        },
        error: function () {
            alert("Ошибка загрузки данных профиля");
        }
    });

    // Обработка отправки формы
    $("#edit-profile-form").submit(function (event) {
        event.preventDefault();

        const updatedData = {
            first_name: $("#first_name").val(),
            last_name: $("#last_name").val(),
            email: $("#email").val(),
            // username не меняем
        };

        $.ajax({
            url: API_URL,
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            data: JSON.stringify(updatedData),
            success: function () {
                alert("Профиль успешно обновлён");
                window.location.href = "profile.html";
            },
            error: function () {
                alert("Ошибка при обновлении профиля");
            }
        });
    });

    // Выход
    $("#logout-btn").click(function () {
        localStorage.clear();
        window.location.href = "login.html";
    });
});
