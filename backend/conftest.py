import pytest
from pytest_factoryboy import register
from tests.factories import UserFactory, BudgetFactory


register(UserFactory)
register(BudgetFactory)