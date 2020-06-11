from flask import Flask, request, jsonify
from flask_cors import CORS
from okta.UsersClient import UsersClient
from okta.models.user.User import User
from okta.models.user.LoginCredentials import LoginCredentials
from okta.models.user.Password import Password

app = Flask(__name__)
cors = CORS(app)

BASE_URL = "{{OKTA_BASE_URL}}"
OKTA_API_TOKEN = "{{OKTA_API_TOKEN}}"
STATE = {}


@app.route("/users", methods=["GET", "POST", "DELETE"])
def create_user():
    if request.method == "GET":
        if STATE.get("userInfo") is not None:
            users_client = get_api_client(UsersClient)
            user = users_client.get_user(STATE["user_info"]["id"])
            return {
                "id": user.id,
                "email": user.profile.email,
                "ssn": user.profile.ssn
            }
        else:
            return {}
    else:
        users_client = get_api_client(UsersClient)
        if request.method == "DELETE":
            users_client.delete_user(STATE["userInfo"]["id"])
            users_client.delete_user(STATE["userInfo"]["id"])
            STATE["user_info"] = None
            return jsonify(success=True)
        else:
            data = request.json
            password = Password()
            password.value = data["password"]
            login_credentials = LoginCredentials()
            login_credentials.password = password
            user = User(
                firstName=data["firstName"],
                lastName=data["lastName"],
                email=data["email"],
                login=data["email"])
            user.credentials = login_credentials
            user.profile.ssn = data["ssn"]
            user_response = users_client.create_user(user, True)
            STATE["userInfo"] = {
                "id": user_response.id,
                "email": data["email"],
                "ssn": data["ssn"]
            }
            return jsonify(STATE)


def get_api_client(cls):
    return cls(base_url=BASE_URL, api_token=OKTA_API_TOKEN)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
