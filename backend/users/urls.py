from . import views
from django.urls import path, include
from rest_framework import routers


router = routers.DefaultRouter()
router.register('user', views.UserViewSet)

urlpatterns = [
    path('users', include(router.urls)), 
]
