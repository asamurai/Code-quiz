from django.db import models
from django.conf import settings


class QuizCategory(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField()

    def __str__(self):
        return self.name


class Topic(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField()
    category = models.ForeignKey(QuizCategory, on_delete=models.CASCADE, related_name='topics')

    def __str__(self):
        return self.name


class Quiz(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='topics')
    title = models.CharField(max_length=128)
    description = models.TextField()
    image = models.ImageField(null=True, upload_to='quiz_images/', blank=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Chain(models.Model):
    chain_text = models.TextField()
    chain_category = models.ForeignKey(QuizCategory, on_delete=models.CASCADE, related_name='category')

    def __str__(self):
        return self.chain_text


class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    text_question = models.TextField()
    chain = models.ForeignKey(Chain, on_delete=models.CASCADE, related_name='chains')
    level = models.PositiveSmallIntegerField()
    source = models.TextField()

    def __str__(self):
        return self.text_question


class Answer(models.Model):
    answer = models.TextField()
    is_true = models.BooleanField()
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)

    def __str__(self):
        return self.answer

# class Session(models.Model):
#     datetime_start = models.DateTimeField(auto_now_add=True)
#     # quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
#     is_finished = models.BooleanField(default=False)

class UserProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    # quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, null=True)
    datetime_started = models.DateTimeField(blank=True)
    is_finished = models.BooleanField(default=False)

