from django.db import models
from django.conf import settings


class QuizCategory(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField()

    def __str__(self):
        return self.name


class Quiz(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category = models.ForeignKey(QuizCategory, on_delete=models.CASCADE, related_name='categories')
    title = models.CharField(max_length=128)
    description = models.TextField()
    image = models.ImageField(null=True, upload_to='quiz_images/')
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
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    text_question = models.TextField()
    chain = models.ForeignKey(Chain, on_delete=models.CASCADE)
    level = models.PositiveSmallIntegerField()
    source = models.TextField()


class Answer(models.Model):
    answer = models.TextField()
    is_true = models.BooleanField()
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)

    def __str__(self):
        return self.answer


class UserProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)
    datetime_finished = models.DateTimeField(blank=True)
