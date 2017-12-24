from django.contrib import admin
from .models import QuizCategory, Chain, Question, Quiz, Answer

admin.site.register(QuizCategory)
admin.site.register(Chain)
admin.site.register(Question)
admin.site.register(Quiz)
admin.site.register(Answer)