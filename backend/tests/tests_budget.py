import pytest
from tests.factories import BudgetFactory

def test_new_user(budget_factory):
    budget = budget_factory.build()
    print(budget.user_id)
    assert True
    