import pytest
from app import app

from okta.models.user import User

@pytest.fixture
def client():
    with app.app.test_client() as client:
        yield client


def test_create_user(client, mocker):
    mock_user = User(
        firstName="Test",
        lastName="Testington",
        email="test@test.com",
        login="test@test.com")
    mock_user.profile.ssn = "1111"
    mock_user.id = "1234"
    mocker.patch(__name__ + ".app.UsersClient.create_user", return_value=mock_user)
    create_response = client.post("/users", json={
        "firstName": "Test",
        "lastName": "Testington",
        "email": "test@test.com",
        "password": "password",
        "ssn": "1111"
    }).json
    expected_response = {
        "userInfo": {
            "id": "1234",
            "email": "test@test.com",
            "ssn": "1111"
        }
    }
    assert create_response == expected_response


def test_get_user(client, mocker):
    mock_user = User(
        firstName="Test",
        lastName="Testington",
        email="test@test.com",
        login="test@test.com")
    mock_user.profile.ssn = "1111"
    mock_user.id = "1234"
    mocker.patch(__name__ + ".app.UsersClient.create_user", return_value=mock_user)

    client.post("/users", json={
        "firstName": "Test",
        "lastName": "Testington",
        "email": "test@test.com",
        "password": "password",
        "ssn": "1111"
    })

    mocker.patch(__name__ + ".app.UsersClient.get_user", return_value=mock_user)
    get_response = client.get("/users").json
    expected_response = {
            "id": "1234",
            "email": "test@test.com",
            "ssn": "1111"
    }
    assert get_response == expected_response


def test_delete_user(client, mocker):
    mock_user = User(
        firstName="Test",
        lastName="Testington",
        email="test@test.com",
        login="test@test.com")
    mock_user.profile.ssn = "1111"
    mock_user.id = "1234"
    mocker.patch(__name__ + ".app.UsersClient.create_user", return_value=mock_user)

    client.post("/users", json={
        "firstName": "Test",
        "lastName": "Testington",
        "email": "test@test.com",
        "password": "password",
        "ssn": "1111"
    })

    mocker.patch(__name__ + ".app.UsersClient.delete_user", return_value=None)
    delete_response = client.delete("/users")
    assert delete_response.status_code == 200

    get_response = client.get("/users").json
    assert get_response == {}

