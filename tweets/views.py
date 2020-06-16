# Django
from django.shortcuts import render, Http404, redirect
from django.http import HttpResponse, JsonResponse
from django.utils.http import is_safe_url
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
# DRF
from rest_framework.response import Response
from rest_framework.decorators import api_view

# General Python
import random 

# Internal
from .serializers import TweetSerializer
from .models import Tweets
from .forms import TweetForm

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


def home_view(request, *args, **kwargs):
    return render(request, "main/home.html")


@api_view(['POST'])
def tweet_create_view(request, *args, **kwargs):
    serializer = TweetSerializer(data=request.POST)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)

@api_view(['GET'])
def tweet_list_view(request, *args, **kwargs):
    qs = Tweets.objects.all()
    serializer = TweetSerializer(qs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def tweet_detail_view(request, tweet_id, *args, **kwargs):
    qs = Tweets.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = TweetSerializer(obj)
    return Response(serializer.data)

def tweet_create_view_pure_django(request, *args, **kwargs):
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


def tweet_detail_view_pure_django(request, tweet_id, *arg, **kwargs):
    data = {
        "id": tweet_id,
        }
    status = 200
    try:
        tweet = Tweets.objects.get(id=tweet_id)
        data['content'] = tweet.content
    except ObjectDoesNotExist:
        data['message'] = "Tweet not found"
        status = 404

    return JsonResponse(data, status= status)


def tweet_list_view_pure_django(request, *args, **kwargs):
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
