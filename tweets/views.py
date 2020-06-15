from django.shortcuts import render, Http404
from django.http import HttpResponse, JsonResponse
import random 
from .models import Tweets

# Create your views here.


def home_view(request, *args, **kwargs):
    return render(request, "main/home.html")

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
    tweet_list = [{ "id": tweet.id, "content": tweet.content, "likes": random.randint(0, 1000) } for tweet in tweet_qs]
    data = {
        "isUser": False,
        "response": tweet_list
    }

    return JsonResponse(data)