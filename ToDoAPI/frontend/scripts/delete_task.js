$(document).ready(function () {
  const taskId = new URLSearchParams(window.location.search).get('id');
  const token = localStorage.getItem('access_token');

  if (!token) {
    alert('Вы не авторизованы. Пожалуйста, войдите.');
    window.location.href = 'login.html';
    return;
  }

  if (!taskId) {
    alert('ID задачи не указан.');
    window.location.href = 'tasks.html';
    return;
  }

  // Подтверждение удаления
  if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
    $.ajax({
      url: `http://localhost:8000/api/tasks/${taskId}/`,
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      success: function () {
        alert('Задача успешно удалена.');
        window.location.href = 'tasks.html';
      },
      error: function (xhr) {
        if (xhr.status === 401) {
          alert('Срок действия сессии истёк. Пожалуйста, войдите снова.');
          window.location.href = 'login.html';
        } else if (xhr.status === 403) {
          alert('У вас нет прав на удаление этой задачи.');
        } else {
          alert(`Ошибка при удалении: ${xhr.status} ${xhr.statusText}`);
        }
      }
    });
  } else {
    // Если отменил — вернуть назад
    window.location.href = 'tasks.html';
  }
});
