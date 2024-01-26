from budget_api.views import revenue_list, expense_list
from django.urls import path


urlpatterns = [
    path('revenue/', revenue_list),
    path('expense/', expense_list),
]
