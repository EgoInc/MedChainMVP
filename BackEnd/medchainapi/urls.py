from django.urls import path

from .views import (PatientDataView,
                    AccessRequestView,
                    PatientSearchView,
                    DoctorPatientListView,
                    AccessRequestsListView,
                    DeletePatientView,
                    DoctorSearchView,
                    ManageAccessView,
                    home
)

urlpatterns = [
    path('doctor/<int:doctor_id>/patient/<int:patient_id>/', PatientDataView.as_view(), name='patient-data'),
    path('doctor/<int:doctor_id>/request-access', AccessRequestView.as_view(), name='request-access'),
    path('doctor/<int:doctor_id>/search-patients', PatientSearchView.as_view(), name='search-patients'),
    path('doctor/<int:doctor_id>/my-patients', DoctorPatientListView.as_view(), name='patients_of_doctor'),
    path('patient/<int:patient_id>/access-requests', AccessRequestsListView.as_view(), name='access_requests'),
    path('patient/<int:patient_id>/delete', DeletePatientView.as_view(), name='delete-patient'),
    path('patient/<int:patient_id>/search-doctors', DoctorSearchView.as_view(), name='search-doctors'),
    path('patient/<int:patient_id>/manage-access', ManageAccessView.as_view(), name='manage-access'),
    path('', home, name='home page'),
]
