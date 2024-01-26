from budget_api.serializers import RevenueSerializer, ExpenseSerializer
from budget_api.models import Revenue, Expense
from rest_framework import viewsets

class RevenueViewSet(viewsets.ModelViewSet):
    queryset = Revenue.objects.all()
    serializer_class = RevenueSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

