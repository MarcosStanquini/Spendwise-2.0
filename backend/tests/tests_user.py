import pytest
from users.models import User

def test_new_user(new_user):
    print(new_user.username)
    assert new_user.username == 'test@gmail.com'
