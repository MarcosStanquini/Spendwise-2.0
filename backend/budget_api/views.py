from django.shortcuts import get_object_or_404
from budget_api.serializers import BudgetSerializer, UpdateBudgetSerializer
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
    

    def update(self, request, pk=None):
        queryset = Budget.objects.all()
        budget = get_object_or_404(queryset, pk=pk)
        serializer = UpdateBudgetSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.update(budget, serializer.validated_data)
        return Response(serializer.data)


    def retrieve(self, request, pk=None):
        queryset = Budget.objects.all()
        budget = get_object_or_404(queryset, pk=pk)
        serializer = BudgetSerializer(budget)
        return Response(serializer.data)
        
    def destroy(self, request, pk=None):
        queryset = Budget.objects.all()
        budget = get_object_or_404(queryset, pk=pk)
        budget.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)








        


    