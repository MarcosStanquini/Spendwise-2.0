from budget_api.serializers import BudgetSerializer
from budget_api.models import Budget
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

class BudgetViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

