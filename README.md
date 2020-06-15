<p align="center"><a href="https://www.verygoodsecurity.com/"><img src="https://avatars0.githubusercontent.com/u/17788525" width="128" alt="VGS Logo"></a></p>
<p align="center"><b>Redact PII from Okta</b></p>

This application demonstrates how placing VGS between an application's front end and back end can intercept PII before the back end can send it on to Okta, while still allowing the user to view it later on in the front end.

# Requirements
* A VGS vault
* Docker
* nGrok
* An Okta account, where users have a custom attribute called "ssn"

# Instructions for using this App

* Add your Okta URL and API token to server/app.py. 
* Add your VGS inbound vault URL to client/src/proerties.js 
* In your terminal, run ```docker-compose up -d --force-recreate```
* Next, run ```ngrok http 5000```
* In the VGS dashboard, configure your inbound route to redact the JSON path $.userProfile.ssn on request and reveal it on response. Set the upstream host to your nGrok URL.  You can use the config.yaml in this project to import a sample route.
* Open http://0.0.0.0:3000/ in your browser, and try creating a user with and without routing through VGS. 
