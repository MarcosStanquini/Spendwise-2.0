from budget_api.serializers import BudgetSerializer
from budget_api.models import Budget
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def budget_list(request):
    budget = Budget.objects.all()
    serializer = BudgetSerializer(budget, many=True)
    return Response(serializer.data)
    
