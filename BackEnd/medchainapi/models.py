from django.db import models


class Patient(models.Model):
    patient_id = models.AutoField(primary_key=True)
    patient_name = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    contract_address = models.CharField(max_length=42, unique=True)  # Адрес в блокчейне


class MedicalOrganization(models.Model):
    organization_id = models.AutoField(primary_key=True)
    organization_name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    contact_info = models.CharField(max_length=255)


class Doctor(models.Model):
    doctor_id = models.AutoField(primary_key=True)
    doctor_name = models.CharField(max_length=255)
    public_key = models.CharField(max_length=255, unique=True)  # Публичный ключ для аутентификации
    organization = models.ForeignKey(MedicalOrganization, on_delete=models.CASCADE, related_name="doctors")
    specialization = models.CharField(max_length=255)


class AccessRequest(models.Model):
    request_id = models.AutoField(primary_key=True)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name="access_requests")
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=[
        ('ожидание', 'ожидание'),
        ('подтверждено', 'подтверждено'),
        ('отклонено', 'отклонено')
    ])
    request_date = models.DateTimeField(auto_now_add=True)


class ActionLog(models.Model):
    log_id = models.AutoField(primary_key=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="action_logs")
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name="action_logs")
    action_type = models.CharField(max_length=50)
    action_date = models.DateTimeField(auto_now_add=True)
