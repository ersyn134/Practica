$(document).ready(function () {
  const token = localStorage.getItem('access_token');

  if (!token) {
    alert('Вы не авторизованы. Пожалуйста, войдите.');
    window.location.href = 'login.html';
    return;
  }

  $('#create-task-form').submit(function (e) {
    e.preventDefault();

    const title = $('#title').val();
    const description = $('#description').val();
    const completed = $('#completed').val();

    $.ajax({
      url: 'http://localhost:8000/api/tasks/',
      method: 'POST',
      contentType: 'application/json',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      data: JSON.stringify({
        title: title,
        description: description,
        completed: completed  // 'completed' или 'not_completed'
      }),
      success: function () {
        alert('Задача успешно создана!');
        window.location.href = 'tasks.html';
      },
      error: function (xhr) {
        if (xhr.status === 401) {
          alert('Срок действия токена истек. Пожалуйста, войдите снова.');
          window.location.href = 'login.html';
        } else {
          alert(`Ошибка: ${xhr.status} ${xhr.statusText}`);
        }
      }
    });
  });
});
