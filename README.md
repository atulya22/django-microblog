<h1 align="center">
  A DRF powered Microblogging API
</h1>

<h2> Summary </h2>

A microblogging API (twitter-like) created using the Django rest framework. 

<a href="https://tuly-microblog.herokuapp.com/"> API DEMO </a>

<h2> Application Features </h2>

- Home page designed to display all messages post through the list API
- Feeds API that fetches posts made by the authenicated users as well posts by the users followers
- Login/Logout/Register page for user account management.
- API's for users to create, repost, like and unlike posts
- Profile detail API to fetch user profiles details as well as update user details
- Pagination on the list API to limit the payload on the each request 

<h2> Techinal Details</h2>

<h3> Project Structure </h3>

The Django project is split into three django apps and a single react app to maintain seperation. 

<h4>tweets app</h4>

The **tweets app** is a core component and contains the API's to create, view and delete messages. 
It also contain API's to manage user actions such as likes, unlikes and message reposts.
Finally, it also has a feed's API that displays messages for authenciated based on the people they are following and thier own posts.

The **tweets app** uses the Django rest framework to build its API. The api_view decorator is used to describe allowed request methods on the resource while the permission_classes decorator is used specify whether authenication is required to access a resource. 

Serializers are used to provide the clients with a standard json response format. 

Models are setup to manage message attributes as well the relationship message and message likes. 

Model managers used to keep the views thin and handle some of the business logic.

<h4>profiles app</h4>

The profiles app also makes use of DRF and contains a single API to list user profile details as well as provide the ability
to update a users profile

<h4>accounts app</h4>
The accounts app contains the view to render the login, logout and register page, we use Django's in-build authentication modules to handle the account creation and login/logout process. 

<h4>tweets-web(react)</h4>

A basic React app is setup on the frontend to display the API features


<h2> Deployment </h2>

<h3> Heroku </h3>

Download and install the Heroku cli

`brew tap heroku/brew && brew install heroku`

Run the following command and login through your browser

`heroku login`

Run the following command and create a Heroku app

`heroku create YOUR_UNIQUE_APP_NAME`

In your virtual environment, run the following installs and freeze your requirements

`pip install gunicorn`

`pip install django-heroku`

`pip freeze -> requirements.txt`

Create a file called **Procfile** in your root folder and add the following

`web: gunicorn your_project_name.wsgi`

In your **settings.py**, change the host and set the root for static files

`ALLOWED_HOST=['YOUR_HEROKU_APP_NAME']`

`STATIC_ROOT=STATICFILES_DIRS = os.path.join(BASE_DIR, "staticfiles")`

`django_heroku.settings(locals())`

Set your secret key and debug boolean as a Heroku environment variable

`heroku config set: DJANGO_SECRET_KEY="YOUR SECRET KEY"`

`heroku config set: DJANGO_DEBUG="FALSE"`

Update **settings.py** to get secret key from environment variable

`SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')`

`DEBUG = os.environ.get('DJANGO_DEBUG')`

In your terminal, run the following commands to run a migration on your Heroku server

`heroku run bash python manage.py migrate`

Create a super user on your Heroku server

`heroku run bash python manage.py createsuperuser`

Initialize a git repository (if there isn't one already), commit.

`git init`

`git add .`

`git commit -m "commit message"` 

Follow the deployment checklist on the <a href="https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/"> Django
website</a> to ensure everything is setup correctly.

Finally push to Heroku

`git push Heroku master`

<h3> Local environment </h3>

Run the following command should the web app on **127.0.0.1:8000**

`python manage.py runserver`


