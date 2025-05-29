from rest_framework_simplejwt.views import TokenObtainPairView
from django.urls import path
from .views import RegisterView, ProfileViewSet

profile = ProfileViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy',
})
urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('profile/', profile, name='profile'),
    path('profile/me/', ProfileViewSet.as_view({'get': 'me'}), name='profile-me'),

]


