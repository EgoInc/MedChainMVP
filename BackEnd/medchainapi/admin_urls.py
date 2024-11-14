from django.urls import path
from .views import AddPatientView

urlpatterns = [
    path('', AddPatientView.as_view(), name='add-patient'),
]