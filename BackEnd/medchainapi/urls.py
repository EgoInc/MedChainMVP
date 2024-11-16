from django.urls import path

from .views import (PatientDataView,
                    AccessRequestView,
                    PatientSearchView,
                    DoctorPatientListView,
                    AccessRequestsListView,
                    AuthorizedDoctorsListView,
                    RespondView,
                    home
)

urlpatterns = [
    path('doctor/<int:doctor_id>/patient/<int:patient_id>/', PatientDataView.as_view(), name='patient-data'),
    path('doctor/<int:doctor_id>/request-access', AccessRequestView.as_view(), name='request-access'),
    path('doctor/<int:doctor_id>/search-patients', PatientSearchView.as_view(), name='search-patients'),
    path('doctor/<int:doctor_id>/my-patients', DoctorPatientListView.as_view(), name='patients_of_doctor'),
    path('patient/<int:patient_id>/access-requests', AccessRequestsListView.as_view(), name='access_requests'),
    path('patient/<int:patient_id>/authorized-doctors', AuthorizedDoctorsListView.as_view(), name='authorized-doctors'),
    path('patient/<int:patient_id>/access-request/<int:request_id>/respond', RespondView.as_view(), name='respond'),
    path('', home, name='home page'),
]
