from django.test import TestCase
from django.contrib.auth import get_user_model
# Create your tests here.
from .models import Profile

User = get_user_model()


class ProfileTestCases(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.userb = User.objects.create_user(username='testuserb', password='testpassword')

    def test_profile_created(self):
        qs = Profile.objects.all()
        self.assertEqual(qs.count(), 2)

    def test_following(self):
        first = self.user
        second = self.userb

        first.profile.followers.add(second)
        second_user_following_whom = second.following.all()
        qs = second_user_following_whom.filter(user=first)

        self.assertTrue(qs.exists())

        first_user_following_no_one = first.following.all()
        self.assertFalse(first_user_following_no_one.exists())

