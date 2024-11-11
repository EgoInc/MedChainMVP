from django.contrib import admin
from .models import Patient, Doctor, MedicalOrganization, AccessRequest, ActionLog

admin.site.register(Patient)
admin.site.register(Doctor)
admin.site.register(MedicalOrganization)
admin.site.register(AccessRequest)
admin.site.register(ActionLog)
