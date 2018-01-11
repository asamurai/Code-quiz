from django.contrib import admin
from .models import SupportTopic, SupportCategory, Comment
# Register your models here.
admin.site.register(SupportCategory)
admin.site.register(SupportTopic)
admin.site.register(Comment)
