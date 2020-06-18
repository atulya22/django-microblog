from django.db import models
import random
from django.conf import settings
# Create your models here.


User = settings.AUTH_USER_MODEL


class TweetLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweets", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Tweets(models.Model):

    parent = models.ForeignKey("self", null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tweets")
    content = models.TextField(blank=True, null=True)
    likes = models.ManyToManyField(User, related_name='tweet_user', blank=True,
                                   through=TweetLike)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-id']

    @property
    def is_retweet(self):
        return self.parent is not None
