# Django
from django.shortcuts import render, Http404, redirect
from django.http import HttpResponse, JsonResponse
from django.utils.http import is_safe_url
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
# DRF
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import (api_view,
                                       permission_classes,
                                       authentication_classes)
from rest_framework.permissions import IsAuthenticated

# General Python
import random

# Internal
from ..serializers import (
    TweetSerializer,
    TweetActionSerializer,
    TweetCreateSerializer
)

from ..models import Tweets
from ..forms import TweetForm

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_create_view(request, *args, **kwargs):
    serializer = TweetCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)


@api_view(['GET'])
def tweet_list_view(request, *args, **kwargs):
    qs = Tweets.objects.all()
    username = request.GET.get('username')
    if username is not None:
        qs = qs.by_username(username=username)
    return get_paginated_queryset_response(qs, request)


@api_view(['GET'])
def tweet_detail_view(request, tweet_id, *args, **kwargs):
    qs = Tweets.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = TweetSerializer(obj)
    return Response(serializer.data)


@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def tweet_delete_view(request, tweet_id, *args, **kwargs):
    qs = Tweets.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)

    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({"message": "You cannot delete this tweet"},
                        status=401)

    obj = qs.first()
    obj.delete()
    return Response({"message": "Tweet was deleted"}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_action_view(request, *args, **kwargs):
    '''
        Actions view: like, unlike and retweet actions
        id required
    '''

    serializer = TweetActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get('id')
        action = data.get('action')
        content = data.get('content')

        qs = Tweets.objects.filter(id=tweet_id)
        if not qs.exists():
            return Response({}, status=404)

        obj = qs.first()
        if action == 'like':
            obj.likes.add(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == 'unlike':
            obj.likes.remove(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == 'retweet':
            new_tweet = Tweets.objects.create(user=request.user,
                                              content=content, parent=obj)
            serializer = TweetSerializer(new_tweet)
            return Response(serializer.data, status=201)

    return Response({}, status=200)


def get_paginated_queryset_response(qs, request):
    paginator = PageNumberPagination()
    paginator.page_size = 20
    paginated_qs = paginator.paginate_queryset(qs, request)
    serializer = TweetSerializer(paginated_qs, many=True)
    return paginator.get_paginated_response(serializer.data)



@permission_classes([IsAuthenticated])
@api_view(['GET'])
def tweet_feed_view(request, *args, **kwargs):
    user = request.user
    qs = Tweets.objects.feed(user)
    return get_paginated_queryset_response(qs, request)

