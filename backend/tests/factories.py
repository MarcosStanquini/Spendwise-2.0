import pytest
import factory
from users.models import User
from budget_api.models import Budget
from faker import Faker
fake = Faker()

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    name = fake.name()
    username = fake.email()
    password = fake.password()



class BudgetFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Budget


    value = fake.random_int(min=100, max=10000)
    date = fake.date()
    description = fake.text()
    expense = False
    user_id = factory.SubFactory(UserFactory)





