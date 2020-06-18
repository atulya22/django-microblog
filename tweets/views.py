# Django
from django.shortcuts import render, Http404, redirect
from django.http import HttpResponse, JsonResponse
from django.utils.http import is_safe_url
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist


def home_view(request, *args, **kwargs):
    return render(request, "main/feed.html")


def tweets_list_view(request, *args, **kwargs):
    return render(request, "tweets/list.html")


def tweets_detail_view(request, tweet_id, *args, **kwargs):
    return render(request, "tweets/detail.html",
                  context={"tweet_id": tweet_id})
