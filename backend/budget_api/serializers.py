from budget_api.models import Budget
from rest_framework import serializers

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = '__all__'

class UpdateBudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ["name", "value", "date", "description", "expense"]
        