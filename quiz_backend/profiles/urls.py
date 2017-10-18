from django.conf.urls import url
from rest_framework.authtoken import views
from .views import register, activate, logout, restore_password

urlpatterns = [
    url(r'^register/$', register),
    url(r'^activate/(?P<activation_key>\w+)/$', activate),
    url(r'^api-token-auth/', views.obtain_auth_token),
    url(r'^logout/$', logout),
    url(r'^forgot_password/$', restore_password),
]