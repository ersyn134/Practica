from rest_framework import routers
from .views import TaskViewSet
router = routers.DefaultRouter()
router.register(r'tasks', TaskViewSet)
urlpatterns = router.urls