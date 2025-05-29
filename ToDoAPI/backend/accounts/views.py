from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
import rest_framework.status
from rest_framework.viewsets import ModelViewSet
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin
from .models import User
from .serializers import UserSerializer
# Create your views here.

class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny,]
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "User registered successfully"
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import User
from .serializers import UserSerializer


class ProfileViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def update(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request):
        user = request.user
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['get'])
    def me(self, request):
        """Альтернатива retrieve — по URL /accounts/profile/me/"""
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
