# Django
from django.shortcuts import render, Http404, redirect
from django.http import HttpResponse, JsonResponse
from django.utils.http import is_safe_url
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
# DRF
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import (api_view,
                                       permission_classes,
                                       authentication_classes)
from rest_framework.permissions import IsAuthenticated

from ..serializers import PublicProfileSerializer
# General Python

from django.contrib.auth import get_user_model
from ..models import Profile

User = get_user_model()

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def user_follow_view(request, username, *args, **kwargs):
#     print("Calling follow")

#     me = request.user
#     other_user_qs = User.objects.filter(username=username)

#     if me.username == username:
#         my_followers = me.profile.followers.all()
#         return Response({"count": my_followers.count()}, status=200)

#     if not other_user_qs.exists():
#         return Response({}, status=404)
#     other = other_user_qs.first()
#     profile = other.profile

#     action = data.get('action')
#     if action == 'follow':
#         profile.followers.add(me)
#     elif action == 'unfollow':
#         profile.followers.remove(me)
#     else:
#         pass

#     serializer = PublicProfileSerializer(instance=profile, context={"request":request})

#     return Response(serializer.data, status=200)


@api_view(['GET', 'POST'])
def profile_detail_api_view(request,  username, *args, **kwargs):
    print("Calling detail")
    print(username)
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        return Reponse({"detail": "User not found"}, status=404)
    profile_obj = qs.first()
    data = request.data or {}
    me = request.user

    if (request.method == "POST" and profile_obj.user != me):
        action = data.get('action')
        if action == 'follow':
            profile_obj.followers.add(me)
        elif action == 'unfollow':
            profile_obj.followers.remove(me)
        else:
            pass
    serializer = PublicProfileSerializer(instance=profile_obj, context={"request": request})
    return Response(serializer.data, status=200)
