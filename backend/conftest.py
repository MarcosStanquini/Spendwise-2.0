
import pytest
from users.models import User

"""@pytest.fixture(scope = 'session')
def user_test():
    user = User.objects.create(name='Test', username='test@gmail.com')
    print(user)
    return  user"""


@pytest.fixture
def new_user_factory(db):
    def create_app_user(
        name: str = "Test",
        username: str = "test@gmail.com",
        password: str = "test",
    ):
        user = User.objects.create_user(
            name = name,
            username = username,
            password = password
        )
        return user
    return create_app_user


@pytest.fixture
def new_user(db, new_user_factory):
    return new_user_factory("Test", "test@gmail.com", "test")

    