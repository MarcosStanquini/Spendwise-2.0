from budget_api.serializers import BudgetSerializer
from budget_api.models import Budget
from users.models import User
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class BudgetViewSet(viewsets.ViewSet):
    #permission_classes = (IsAuthenticated,)
    serializer_class = BudgetSerializer

    def list(self, request):
        user = request.user
        budgets = Budget.objects.filter(user_id=user.id).values()
        return Response(budgets, status.HTTP_200_OK)
    
    def create(self, request):
       serializer = BudgetSerializer(data=request.data)
       serializer.is_valid(raise_exception=True)
       return Response(serializer.data, status=status.HTTP_201_CREATED)
    