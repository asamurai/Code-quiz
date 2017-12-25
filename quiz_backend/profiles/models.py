import datetime

from django.conf import settings
from django.db import models
from annoying.fields import AutoOneToOneField

class RegistrationProfile(models.Model):
    """
    A simple profile which stores an activation key for use during
    user account registration.
    """
    ACTIVATED = u"ALREADY_ACTIVATED"

    user = models.AutoOneToOneField(settings.AUTH_USER_MODEL, unique=True, verbose_name='user',
                                related_name='api_registration_profile', on_delete=models.CASCADE,)
    activation_key = models.CharField(max_length=40)


class UserProfile(models.Model):
    user = models.AutoOneToOneField(settings.AUTH_USER_MODEL, unique=True, verbose_name='user_profile',
                                related_name='extended_profile', on_delete=models.CASCADE,)
    bio = models.TextField(null=True)
    profile_image = models.ImageField(null=True, upload_to='profile_images/')
