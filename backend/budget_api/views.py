from budget_api.serializers import RevenueSerializer, ExpenseSerializer
from budget_api.models import Revenue, Expense
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

class RevenueViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Revenue.objects.all()
    serializer_class = RevenueSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

