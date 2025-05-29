from django.contrib import admin
from .models import User
# Register your models here.


@admin.register(User)
class AbstractUserAdmin(admin.ModelAdmin):
    list_display = (
        'first_name',
        'last_name',
        'username',
        'email',
        'is_staff',
        'is_superuser',
        'is_active')
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    search_fields = ('username', 'email')
