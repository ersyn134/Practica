from django.db import models
from accounts.models import User

class Task(models.Model):
    COMPLETE_CHOICES = (
        ('completed', 'Выполнено'),
        ('not_completed', 'Не выполнено'),
    )

    title = models.CharField(max_length=100)
    description = models.TextField()
    completed = models.CharField(max_length=20, choices=COMPLETE_CHOICES, default='not_completed')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.title} ({self.owner.username})"
