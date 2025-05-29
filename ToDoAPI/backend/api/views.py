from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from api.models import Task
from api.permission import IsOwnerOrReadOnly
from api.serializers import TaskSerializer


# Create your views here.
class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated,IsOwnerOrReadOnly]
    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)