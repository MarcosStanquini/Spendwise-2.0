from . import views
from django.urls import path, include
from rest_framework import routers

router = routers.DefaultRouter()
router.register('budgets', views.BudgetViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
