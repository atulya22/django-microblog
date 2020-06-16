from django import forms
from django.conf import settings
from .models import Tweets


MAX_TWEET_LENGTH = settings.MAX_TWEET_LENGTH


class TweetForm(forms.ModelForm):
    class Meta:
        model = Tweets
        fields = ['content']

    def clean_content(self):
        content = self.cleaned_data.get('content')
        if len(content) > MAX_TWEET_LENGTH:
            raise forms.ValidationError("Tweet exceeds max character \
                limit of 240")
        return content
