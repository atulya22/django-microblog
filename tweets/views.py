from django.shortcuts import render, Http404, redirect
from django.http import HttpResponse, JsonResponse
from django.utils.http import is_safe_url
from django.conf import settings

import random 
from .models import Tweets
from .forms import TweetForm

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


def home_view(request, *args, **kwargs):
    return render(request, "main/home.html")


def tweet_create_view(request, *args, **kwargs):
    print("Ajax request", request.is_ajax())

    if not request.user.is_authenticated:
        if request.is_ajax():
            return JsonResponse({}, status=401)
        return redirect(settings.LOGIN_URL)    
    form = TweetForm(request.POST or None)
    next_url = request.POST.get("next") or None

    if form.is_valid():
        obj = form.save(commit=False)
        obj.user = request.user
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201)
        if next_url is not None and is_safe_url(next_url, allowed_hosts=ALLOWED_HOSTS):
            return redirect(next_url)
        form = TweetForm()

    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status=400)

    return render(request, "components/form.html", context={"form": form})

def tweet_detail_view(request, tweet_id, *arg, **kwargs):
    data = {
        "id": tweet_id,
        }
    status = 200    
    try:
        tweet = Tweets.objects.get(id=tweet_id)
        data['content'] = tweet.content
    except:
        data['message'] = "Tweet not found"
        status = 404

    return JsonResponse(data, status= status)


def tweet_list_view(request, *args, **kwargs):
    """
        REST API VIEW
        CONSUMED BY THE FRONTEND
        RETURNS JSON DATA
    """
    tweet_qs = Tweets.objects.all()
    tweet_list = [tweet.serialize() for tweet in tweet_qs]
    data = {
        "isUser": False,
        "response": tweet_list
    }

    return JsonResponse(data)