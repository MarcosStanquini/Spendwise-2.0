from budget_api.models import Budget, Revenue, Expense
from rest_framework import serializers

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = '__all__'

class RevenueSerializer(BudgetSerializer):
    class Meta(BudgetSerializer.Meta):
        model = Revenue

class ExpenseSerializer(BudgetSerializer):
    class Meta(BudgetSerializer.Meta):
        model = Expense
