from django.urls import path

from .views import *

urlpatterns = [
    path('doctor/<int:doctor_id>/patient/<int:patient_id>/', PatientDataView.as_view(), name='patient-data'),
    path('doctor/<int:doctor_id>/request-access', AccessRequestView.as_view(), name='request-access'),
    path('doctor/<int:doctor_id>/search-patients', PatientSearchView.as_view(), name='search-patients'),
    path('doctor/<int:doctor_id>/my-patients', DoctorPatientListView.as_view(), name='patients-of-doctor'),
    path('doctor/<int:doctor_id>/get-info', DoctorInfoView.as_view(), name='doctor-info'),

    path('patient/<int:patient_id>/access-requests', AccessRequestsListView.as_view(), name='access-requests'),
    path('patient/<int:patient_id>/authorized-doctors', AuthorizedDoctorsListView.as_view(), name='authorized-doctors'),
    path('patient/<int:patient_id>/access-request/<int:request_id>/respond', AccessRespondView.as_view(), name='respond'),

    path('admin/add-doctor', CreateDoctorView.as_view(), name='add-doctor'),
    path('admin/add-patient', CreatePatientView.as_view(), name='add-patient'),
    path('', home, name='home-page'),
]
