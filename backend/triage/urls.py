from django.urls import path

from . import views

urlpatterns = [
    path('health', views.health, name='health'),
    path('scenarios', views.scenarios, name='scenarios'),
    path('triage', views.triage, name='triage'),
]
