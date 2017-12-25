from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.routers import SimpleRouter
from .views import register, activate, logout, restore_password, login, ProfilesViewSet


router = SimpleRouter()
router.register(r"user/id", ProfilesViewSet)

urlpatterns = [
    url(r'^register/$', register),
    url(r'^activate/(?P<activation_key>\w+)/$', activate),
    url(r'^login/', login),
    url(r'^logout/$', logout),
    url(r'^forgot_password/$', restore_password),
]

urlpatterns += router.urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)