<p align="center"><a href="https://www.verygoodsecurity.com/"><img src="https://avatars0.githubusercontent.com/u/17788525" width="128" alt="VGS Logo"></a></p>
<p align="center"><b>Redact PII from Okta</b></p>

This application demonstrates how placing VGS between an application's front end and back end can intercept PII before the back end can send it on to Okta, while still allowing the user to view it later on in the front end.

# Requirements
* A VGS vault
* Docker
* nGrok
* An Okta account, where users have a custom attribute called "ssn"

# Running the Application

* Edit ```docker_compose.yaml```, and replace YOUR_VGS_VAULT_ID with your VGS vault ID.
* In your terminal, run ```docker-compose up -d --force-recreate```
* Next, run ```ngrok http 5000```

## VGS Dashboard Configuration
Set your route's upsteam host to your nGrok URL. Add filters for the reveal and redact. Note that the coordinates specified in the routes consist of four digitis - x coordinate of the bottom left corner, y coordinate of the bottom left corner, width, and height respectively. 

* Add a redact filter to mask the desired part of PDFs sent to the redact route
* Add a reveal filter to reveal that part in PDFs sent to the reveal route

For a quick start, you can use the config.yaml in this project to import a sample route. Using [vgs-cli](https://www.verygoodsecurity.com/docs/cli), run
```vgs --tenant=VAULT_ID route --sync-all < config.yaml```

### Try it out

Note: This app is intended to demonstrate VGS's capabilities and is not intended to securely handle live data. Do not input any PDFs containing real sensitive data.

* Open http://0.0.0.0:3000/ in your browser
* Upload a PDF of your choice
* Click "Redact" and observe the result with the redaction
* Click "Reveal" and observe how the original PDF is displayed again

