from django.db import models
from django.conf import settings


class QuizCategory(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField()


class Quiz(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category = models.ForeignKey(QuizCategory, on_delete=models.CASCADE, related_name='categories')
    title = models.CharField(max_length=128)
    description = models.TextField()
    image = models.ImageField(null=True, upload_to='quiz_images/')
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)


class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    chain = models.TextField()
    level = models.PositiveSmallIntegerField()
    source = models.TextField()


class Answer(models.Model):
    answer = models.TextField()
    is_true = models.BooleanField()
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)


class UserProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)
    datetime_finished = models.DateTimeField(blank=True)