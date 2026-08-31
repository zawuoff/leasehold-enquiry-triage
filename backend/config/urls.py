"""Root URL configuration.

All application endpoints live under /api/ (see triage.urls). No admin is
mounted — this backend is a stateless JSON API.
"""
from django.urls import include, path

urlpatterns = [
    path('api/', include('triage.urls')),
]
