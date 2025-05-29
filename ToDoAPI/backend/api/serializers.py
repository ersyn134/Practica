from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField(read_only=True)
    completed_display = serializers.CharField(
        source='get_completed_display', read_only=True)

    class Meta:
        model = Task
        fields = [
            'id',
            'owner',
            'title',
            'description',
            'completed',
            'completed_display',
            'created_at',
            'updated_at']
