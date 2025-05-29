$(document).ready(function () {
  const tasksId = new URLSearchParams(window.location.search).get('id');

  // Загрузка данных задачи
  $.ajax({
    url: `http://localhost:8000/api/tasks/${tasksId}/`,
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    },
    success: function (task) {
      $('#title').val(task.title);
      $('#description').val(task.description);
      $('#completed').val(task.completed.toLowerCase());
    },
    error: function () {
      alert('Ошибка загрузки задачи');
    }
  });

  // Отправка обновлённой задачи
  $('#edit-task-form').submit(function(e) {
    e.preventDefault();

    $.ajax({
        url: `http://localhost:8000/api/tasks/${tasksId}/`,
        method: 'PUT',
        contentType: 'application/json',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        data: JSON.stringify({
            title: $('#title').val(),
            description: $('#description').val(),
            completed: $('#completed').val()
        }),
        success: function() {
            window.location.href = `tasks.html`;
        },
        error: function(xhr) {
            alert(`Ошибка: ${xhr.status} ${xhr.statusText}\n${xhr.responseText}`);
        }
    });
  });
});
