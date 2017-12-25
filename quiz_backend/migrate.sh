#!/bin/bash
# Simple script for automating migration

python3 ./manage.py makemigrations quizzes
python3 ./manage.py makemigrations profiles
python3 ./manage.py migrate