
import pytest
from users.models import User
from datetime import date
from budget_api.models import Budget

@pytest.fixture
def new_user_factory(db):
    def create_app_user(
        name: str = "Test",
        username: str = "test@gmail.com",
        password: str = "test",
    ):
        user = User.objects.create(
            name = name,
            username = username,
            password = password
        )
        return user
    return create_app_user


@pytest.fixture
def new_user(db, new_user_factory):
    return new_user_factory("Test", "test@gmail.com", "test")


@pytest.fixture
def new_budget_factory(db, new_user):
    def create_app_budget(
        name: str = "Test_Budget",
        value: int = "200",
        date: date = date(2024, 2, 6),
        description: str = "Gastos",
        expense: bool = True,
        user_id = new_user.id
    ):
        budget = Budget.objects.create(
        name = name, 
        value = value,
        date = date,
        description = description,
        expense = expense,
        user_id = user_id
        )
        return budget
    return create_app_budget

@pytest.fixture
def new_budget(db, new_budget_factory, new_user):
    return new_budget_factory(
        name="Test_Budget",
        value=200,
        date=date(2024, 2, 6),
        description="Gastos",
        expense=True,
        user_id=new_user.id
    )