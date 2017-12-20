from rest_framework import serializers
from .models import TestCategory


class TestCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCategory
        fields = '__all__'
