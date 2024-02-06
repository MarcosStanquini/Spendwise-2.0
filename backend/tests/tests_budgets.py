import pytest
from budget_api.models import Budget

def test_new_budget(new_budget):
    print(new_budget.date)
    assert new_budget.expense == True