# Generated by Django 3.0.6 on 2020-06-16 13:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0005_tweets_timestamp'),
    ]

    operations = [
        migrations.AddField(
            model_name='tweets',
            name='parent',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='tweets.Tweets'),
        ),
    ]
