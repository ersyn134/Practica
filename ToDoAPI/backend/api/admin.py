from django.contrib import admin
from .models import Task
# Register your models here.
@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id','owner_id','owner','title', 'description', 'completed', 'created_at', 'updated_at')
    list_filter = ('completed',)
    search_fields = ('title', 'description')
    ordering = ('-created_at',)
    def owner(self, obj):
        return obj.owner_id.username
    owner.short_description = 'Owner'