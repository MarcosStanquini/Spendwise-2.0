from budget_api.serializers import RevenueSerializer, ExpenseSerializer
from budget_api.models import Revenue, Expense
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def revenue_list(request):
    revenue = Revenue.objects.all()
    serializer = RevenueSerializer(revenue, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def revenue_create(request):
    if request.method == 'POST':
        serializer = RevenueSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def expense_list(request):
    expense = Expense.objects.all()
    serializer = ExpenseSerializer(expense, many=True)
    return Response(serializer.data)

    
