import React from 'react';
import './App.css';
import './properties'
import {properties} from "./properties";

class App extends React.Component {

    static DEFAULT_API_URL = properties.apiUrl;
    static VGS_API_URL = properties.vgsApiUrl;

    static INITIAL_STATE = {
        userInfo: null,
        loading: false,
        apiUrl: App.DEFAULT_API_URL
    }

    constructor(props) {
        super(props);
        this.state = App.INITIAL_STATE;
    }

    componentDidMount() {
        this.getUser();
    };

    getUser = async () => {
        let userInfo = await fetch(this.state.apiUrl + "/users", {
            method: 'GET'
        });
        userInfo = await userInfo.json();
        if (userInfo["email"]) {
            this.setState({userInfo: userInfo});
        }
    };

    handleToggleApiUrl = (apiUrl) => {
        console.log(apiUrl);
        this.setState({apiUrl: apiUrl});
    };

    handleCreateUser = async (data) => {
        this.setState({loading: true});
        let resp = await this.postToApi("/users", data);
        this.setState({
            loading: false,
            userInfo: resp["userInfo"]
        });
    };

    handleDeleteUser = async () => {
        this.setState({loading: true});
        await fetch(this.state.apiUrl + "/users", {
            method: 'DELETE'
        });
        this.setState({
            loading: false,
            userInfo: null
        });
    };

    postToApi = async (path, data) => {
        let resp = await fetch(this.state.apiUrl + path, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return await resp.json();
    }

    render() {
        if (this.state.loading) {
            return <p>Loading</p>
        } else if (this.state.userInfo == null) {
            return <body>
            <UserCreation
                handleSubmit={this.handleCreateUser}
                handleToggleApiUrl={this.handleToggleApiUrl}
                apiUrl={this.state.apiUrl}/>
            </body>
        } else {
            return <body>
            <div className={"col-xs-12 col-sm-8"}>
                <h2>User Profile</h2>
                <p><strong>Email</strong>: {this.state.userInfo.email}</p>
                <p><strong>Social Security Number</strong>: {this.state.userInfo.ssn}</p>
            </div>
            <div className={"col-xs-6 divider text-center"}>
                <div className={"col-xs-12 col-sm-3 emphasis"}>
                    <button className={"btn btn-success btn-block"} onClick={this.handleDeleteUser}>Delete User</button>
                </div>
            </div>
            </body>
        }
    }

}

class ApiSwitchToggle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            apiUrl: props.apiUrl
        };
    }

    handleChange = (event) => {
        this.props.handleChange(event.target.value);
        this.setState({apiUrl: event.target.value})
    }

    render() {
        return <div>
            <div className={"form-check"}>
                <label className="form-check-label" htmlFor={"vgsApiUrl"}>
                    <input
                        className={"form-check-input"}
                        type="radio"
                        name="apiUrl"
                        id={"vgsApiUrl"}
                        value={App.VGS_API_URL}
                        checked={this.state.apiUrl === App.VGS_API_URL}
                        onChange={this.handleChange}
                    />
                    Route through VGS
                </label>
            </div>
            <div className={"form-check"}>
                <label className={"form-check-label"} htmlFor={"defaultApiUrl"}>
                    <input
                        className={"form-check-input"}
                        type="radio"
                        name="apiUrl"
                        id={"defaultApiUrl"}
                        value={App.DEFAULT_API_URL}
                        checked={this.state.apiUrl === App.DEFAULT_API_URL}
                        onChange={this.handleChange}
                    />
                    Don't route through VGS
                </label>
            </div>
        </div>
    }

}

class UserCreation extends React.Component {

    static INITIAL_STATE = {
        firstName: "Test",
        lastName: "User",
        email: "rahul.verma+test@vgs.io",
        password: "tlpWENT2m",
        ssn: "1234"
    }

    constructor(props) {
        super(props);
        this.state = UserCreation.INITIAL_STATE;
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmit = () => {
        this.props.handleSubmit(this.state);
    }

    render() {
        return <div className={"signup-form"}>
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className={"col-xs-8 col-xs-offset-4"}>
                    <h2> Create User </h2>
                </div>
                <div className={"form-group"}>
                    <label className={"control-label col-xs-4"}>First Name </label>
                    <div className={"col-xs-8"}>
                        <input className={"formControl"} type="text" name="firstName" onChange={this.handleChange}
                               value={this.state.firstName}/>
                    </div>
                </div>
                <div className={"form-group"}>
                    <label className={"control-label col-xs-4"}>Last Name </label>
                    <div className={"col-xs-8"}>
                        <input className={"formControl"} type="text" name="lastName" onChange={this.handleChange}
                               value={this.state.lastName}/>
                    </div>
                </div>
                <div className={"form-group"}>
                    <label className={"control-label col-xs-4"}>Email </label>
                    <div className={"col-xs-8"}>
                        <input className={"formControl"} type="email" name="email" onChange={this.handleChange}
                               value={this.state.email}/>
                    </div>
                </div>
                <div className={"form-group"}>
                    <label className={"control-label col-xs-4"}>Password </label>
                    <div className={"col-xs-8"}>
                        <input className={"formControl"} type="password" name="password" onChange={this.handleChange}
                               value={this.state.password}/>
                    </div>
                </div>
                <div className={"form-group"}>
                    <label className={"control-label col-xs-4"}>Social Security Number</label>
                    <div className={"col-xs-8"}>
                        <input className={"formControl"} type="text" name="ssn"
                               onChange={this.handleChange}
                               value={this.state.ssn}/>
                    </div>
                </div>
                <div className={"form-group"}>
                    <div className={"col-xs-8 col-xs-offset-4"}>
                        <ApiSwitchToggle handleChange={this.props.handleToggleApiUrl} apiUrl={this.props.apiUrl}/>
                        <button type={"submit"} className={"btn btn-primary btn-lg"}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    }

}

export default App;
