import pytest
from tests.factories import UserFactory

def test_new_user(user_factory):
    user = user_factory.build()
    print(user.name, user.username, user.password)
    assert True