from django.urls import path

from .views import (PatientDataView,
                    AccessRequestView,
                    PatientSearchView,
                    DoctorPatientListView,
                    AddPatientView,
                    UpdatePatientView,
                    DeletePatientView,
                    DoctorSearchView,
                    ManageAccessView
)

urlpatterns = [
    path('doctor/<int:doctor_id>/patient/<int:patient_id>/', PatientDataView.as_view(), name='patient-data'),
    path('doctor/<int:doctor_id>/request-access', AccessRequestView.as_view(), name='request-access'),
    path('doctor/<int:doctor_id>/search-patients', PatientSearchView.as_view(), name='search-patients'),
    path('doctor/<int:doctor_id>/my-patients', DoctorPatientListView.as_view(), name='patients_of_doctor'),
    path('patient/<int:patient_id>/add', AddPatientView.as_view(), name='add-patient',),
    path('patient/<int:patient_id>/update', UpdatePatientView.as_view(), name='update-patient'),
    path('patient/<int:patient_id>/delete', DeletePatientView.as_view(), name='delete-patient'),
    path('patient/<int:patient_id>/search-doctors', DoctorSearchView.as_view(), name='search-doctors'),
    path('patient/<int:patient_id>/manage-access', ManageAccessView.as_view(), name='manage-access')
]
