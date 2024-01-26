from . import views
from django.urls import path, include
from rest_framework import routers

router = routers.DefaultRouter()
router.register('revenues', views.RevenueViewSet)
router.register('expenses', views.ExpenseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
