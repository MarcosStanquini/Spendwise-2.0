from budget_api.views import budget_list
from django.urls import path


urlpatterns = [
    path('', budget_list)
]
