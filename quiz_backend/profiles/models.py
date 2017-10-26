import datetime

from django.conf import settings
from django.db import models


class RegistrationProfile(models.Model):
    """
    A simple profile which stores an activation key for use during
    user account registration.
    """
    ACTIVATED = u"ALREADY_ACTIVATED"

    user = models.OneToOneField(settings.AUTH_USER_MODEL, unique=True, verbose_name='user', related_name='api_registration_profile')
    activation_key = models.CharField(max_length=40)
