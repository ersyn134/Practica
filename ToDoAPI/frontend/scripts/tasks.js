$(document).ready(function () {
  const taskList = $('#task-list');
  const token = localStorage.getItem('access_token');

  if (!token) {
    alert('Вы не авторизованы. Пожалуйста, войдите.');
    window.location.href = 'login.html';
    return;
  }

  // Загружаем список задач
  $.ajax({
    url: 'http://localhost:8000/api/tasks/',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    success: function (tasks) {
      if (tasks.length === 0) {
        taskList.append('<p>У вас пока нет задач.</p>');
        return;
      }

      tasks.forEach(task => {
        const card = $(`
          <div class="card bg-secondary text-white mb-3">
            <div class="card-body">
              <h5 class="card-title">${task.title}</h5>
              <p class="card-text">${task.description || 'Без описания'}</p>
              <p class="card-text">
                <small class="text-light">${task.completed === 'completed' ? '✅ Выполнено' : '❌ Не выполнено'}</small>
              </p>
              <a href="edit_task.html?id=${task.id}" class="btn btn-sm btn-outline-light me-2">Редактировать</a>
              <a href="delete_task.html?id=${task.id}" class="btn btn-sm btn-outline-danger">Удалить</a>
            </div>
          </div>
        `);
        taskList.append(card);
      });
    },
    error: function (xhr) {
      alert(`Ошибка загрузки задач: ${xhr.status} ${xhr.statusText}`);
      if (xhr.status === 401) {
        window.location.href = 'login.html'; // Если токен невалиден
      }
    }
  });
});
