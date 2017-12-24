from django.conf.urls import url
from rest_framework.authtoken import views
from .views import register, activate, logout, restore_password, UserView, login

urlpatterns = [
    url(r'^register/$', register),
    url(r'^activate/(?P<activation_key>\w+)/$', activate),
    url(r'^login/', login),
    url(r'^logout/$', logout),
    url(r'^forgot_password/$', restore_password),
    url(r'^user/id/(?P<id>\d+)/$', UserView.as_view()),
]