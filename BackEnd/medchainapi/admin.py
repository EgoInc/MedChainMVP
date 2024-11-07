from django.contrib import admin
from .models import Patient, Doctor, MedicalInstitution, AccessRequest, ActionLog

admin.site.register(Patient)
admin.site.register(Doctor)
admin.site.register(MedicalInstitution)
admin.site.register(AccessRequest)
admin.site.register(ActionLog)
