import pytest
from server.app import app

from okta.models.user import User

@pytest.fixture
def client():
    with app.app.test_client() as client:
        yield client


def test_create_user(client, mocker):
    mock_user = User()
    mock_user.id = "1234"
    mocker.patch(__name__ + ".app.UsersClient.create_user", return_value=mock_user)
    expected_response = {
        "userInfo": {
            "id": "1234",
            "email": "test@test.com",
            "ssn": "1111"
        }
    }
    create_response = client.post("/users", json={
        "firstName": "Test",
        "lastName": "Testington",
        "email": "test@test.com",
        "password": "password",
        "ssn": "1111"
    }).json
    assert create_response == expected_response




