# Ecommerce App with Paypal & Stripe Payment

## How to use

### 1- Clone the code
Clone the code and rename '.env-sample' file to '.env' file in 'ecommerce' folder<br />
Now run these code of lines one by one in editor's terminal<br/><br/>

```
cd ecommerce
npm install
cd..
cd ecommerce-front
npm install
```

### 2- Make Mongodb database
Make a local database in mongodb with name of 'ecommerce' <br />
Paste database path in .env file <br /><br />

### 3- Make a paypal developer account
Now go to `https://developer.paypal.com/developer/accounts/` and click on 'Login to Dashboard Button'<br />
Sign up the form to create paypal developer account<br /><br />


### 4- Make Paypal Sandbox Test Accounts
Go to Sandbox tab located on left side and click on 'Accounts'<br />
Click on 'Create Account' button.<br />
Make two accounts. One of 'Personal' type and one of 'Business' type.<br /><br />


### 5- Create Developer App 
Go to 'My Apps and Credentials' tab located in dashboard panel on left side.<br />
Click on 'Create App' and fill up the forms to create app<br />

### 6- Get App's credentials
 Copy 'Client ID' & 'Secret' of your app and paste in .env file of backend<br /><br />

### 7- Clone github repository 
Now paste your 'Client ID' and 'Secret' in this file<br />
Also paste your mysql database credentials in this file<br /><br />

### 8- Download ngrok
Go to `https://ngrok.com/download` and downlaod ngrok in your local storage<br />
After downloading ,open the ngrok.exe and execute this command<br /><br />

```
ngrok http 3000
```

### 9- Hook the developer App
Copy the 'https' Forwarding Link from ngrok shell <br />
Now go to developer app which you created on Paypal<br />
In 'Sanbox Webhooks' section, click on 'Add Webhook' button<br />
Paste ngrok's URL in 'Webhook URL' field.<br />
Choose "Billing Plan Created", "Billing Plan Updated", "Billing Subscription Created" , "Payment Sale Created"<br />
Click on 'Save' button<br /><br />


### 10- Open into browser
Open a browser and go to `http://localhost:3000/`.<br />
You can now buy an item and subscribe too.<br />
Click on 'Buy' or 'Subscribe' button and login with 'personal' type sandbox account.<br />
It will make payment with Paypal . Yayyyyyy<br />


### 11- Make a Stripe developer account

Go to `https://dashboard.stripe.com/register` and signup<br /><br />

### 12- Edit the .env file

Go to stripe developer panel<br/>
Copy your 'Publishable Key' and 'App Secret' and paste in .env file<br/><br/>


### 13- Add Endpoint in Stripe Account

Go to `https://dashboard.stripe.com/`. Now go developer account <br />
Go to webhooks tab. Click on Add Endpoint and paste the url copied from ngrok previously. Also add '/webhooks'at the end of link <br />
So your link will look like this 'https://xxx-xxx-xxx.ngrok.io/webhooks'
Now click on Select Events. Select 'Payment Intent' option and click on 'select all event'<br />
Now click on button "Add Events" 

### 14- Run the code

Now go to your code and run this command in terminal <br />
Make Sure you're in 'ecommerce-front' folder<br/><br/>

```
npm start
```

Now open new terminal and run these code of lines one by one<br /><br />

```
cd ecommerce
nodemon app.js
```

### 15- Open into browser

Open a browser and go to `http://localhost:3000/`.<br />
App will run.Yayyyy.<br /><br/>
