import hashlib
import random
import re
import datetime

from rest_framework.views import exception_handler
from django.conf import settings
from django.utils.timezone import now as datetime_now
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from django.contrib.sites.models import Site
from django.template.loader import render_to_string

from rest_framework.response import Response
from rest_framework import status


from .models import RegistrationProfile, UserProfile


class EmailActivation(object):

    days = 7
    key = None
    ACTIVATED = u"ALREADY ACTIVATED"

    SHA1_RE = re.compile('^[a-f0-9]{40}$')

    def get_days(self):
        return {'message': 'You are registered'}

    def key_expired(self, user):
        """
        Checking, if key expired(timedelta = 7 days), account will be deactivated
        :param user:
        :return:
        """
        activated = RegistrationProfile.objects.get(user=user)
        date_joined = user.date_joined
        expiration_date = datetime.timedelta(days=self.days)
        if date_joined + expiration_date <= datetime_now():
            activated.activation_key = self.ACTIVATED
            activated.save()
            return True
        else:
            return False

    def create_profile(self, user):
        """
        Create RegistrationProfile instance
        :param user: User model instance
        :return: RegistrationProfile instance ( token, user_id )
        """
        activation_key = self.create_activation_key(user)
        registration_profile = RegistrationProfile.objects.create(
            user=user, activation_key=activation_key)
        UserProfile.objects.create(user=user)
        return registration_profile

    def create_activation_key(self, user):
        """
        Generate activation key with SHA1
        """
        username = user.username
        salt_bytes = str(random.random()).encode('utf-8')
        salt = hashlib.sha1(salt_bytes).hexdigest()[:5]
        hash_input = (salt + username).encode('utf-8')
        activation_key = hashlib.sha1(hash_input).hexdigest()
        print(activation_key)
        return activation_key

    def send_activation_email(self, user, site):
        """
        Sending activation key using SMTP protocol. Template file in templates/mail.html
        :param site: Depends on domain
        """
        print(user.api_registration_profile.activation_key)
        ctx_dict = {'activation_key': user.api_registration_profile.activation_key,
                    'expiration_days': self.days,
                    'site': site}
        subject = 'ChainsQuizzes activation key'
        message = render_to_string('mail.html', ctx_dict)
        send_mail(subject=subject, from_email=settings.DEFAULT_FROM_EMAIL,
                  message="", recipient_list=[user.email], html_message=message)

    def activate_user(self, activation_key):
        """
        http://cq.example.com/activate/YOUR TOKEN HERE
        :param activation_key: activation key from REgistrationProfile model
        :return:
        """
        if self.SHA1_RE.search(activation_key):
            try:
                profile = RegistrationProfile.objects.get(
                    activation_key=activation_key)

            except RegistrationProfile.DoesNotExit:
                return False
            if profile.user.is_active and not self.key_expired(profile.user):
                return profile.user
            if not self.key_expired(profile.user):
                user = profile.user
                user.is_active = True
                user.save()
                profile.activation_key = RegistrationProfile.ACTIVATED
                profile.save()
                return user
        return False

    def re_activate(self, email):
        """ Create new key """
        activated = RegistrationProfile.objects.get(user__email=email)
        activated.activation_key = self.create_activation_key(activated.user)
        activated.save()
        self.send_activation_email(activated.user, Site.objects.get_current())

    def create_inactive_user(self, username, email, password=None):
        user_model = get_user_model()
        if username is not None:
            new_user = user_model.objects.create_user(username, email, password)
        else:
            new_user = user_model.objects.create_user(email=email, password=password)
        new_user.is_active = False
        new_user.save()
        self.create_profile(new_user)
        site = Site.objects.get_current()
        self.send_activation_email(new_user, site)
        return new_user


def custom_exception_handler(exc, context):
    """
    Changing exception handler.
    :param exc:All REST framework's default exception handler to get the standard error response.
    :param context: Errors catching by serializers
    """
    response = exception_handler(exc, context)
    if response is not None:
        return Response({'error': {'errors': [response.data]}, 'statusCode': response.status_code},
                        status=status.HTTP_400_BAD_REQUEST)