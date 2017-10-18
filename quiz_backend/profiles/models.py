import datetime

from django.conf import settings
from django.db import models
from django.utils.timezone import now as datetime_now


class RegistrationProfile(models.Model):
    """
    A simple profile which stores an activation key for use during
    user account registration.
    """
    ACTIVATED = u"ALREADY_ACTIVATED"

    user = models.OneToOneField(settings.AUTH_USER_MODEL, unique=True, verbose_name='user', related_name='api_registration_profile')
    activation_key = models.CharField(max_length=40)

    def activation_key_expired(self):

        from . import utils

        expiration_date = datetime.timedelta(
            days=utils.get_settings('REGISTRATION_API_ACCOUNT_ACTIVATION_DAYS'))
        return self.activation_key == self.ACTIVATED or \
               (self.user.date_joined + expiration_date <= datetime_now())

