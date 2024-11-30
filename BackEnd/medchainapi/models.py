from django.db import models


class Patient(models.Model):
    patient_id = models.AutoField(primary_key=True)
    patient_name = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    contract_address = models.CharField(max_length=42, unique=True)  # Адрес в блокчейне

    def __str__(self):
        return f"Пациент {self.patient_name} (ID: {self.patient_id}) родился {self.date_of_birth} с адресом: {self.contract_address}"


class MedicalOrganization(models.Model):
    organization_id = models.AutoField(primary_key=True)
    organization_name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    contact_info = models.CharField(max_length=255)

    def __str__(self):
        return f"Медицинское учреждение: {self.organization_name} (ID: {self.organization_id}) находится: {self.address} связаться: {self.contact_info}"


class Doctor(models.Model):
    doctor_id = models.AutoField(primary_key=True)
    doctor_name = models.CharField(max_length=255)
    public_key = models.CharField(max_length=255, unique=True)  # Публичный ключ для аутентификации
    # organization_name = models.ForeignKey(MedicalOrganization, on_delete=models.CASCADE, related_name="doctors")
    organization = models.ForeignKey(MedicalOrganization, on_delete=models.CASCADE, related_name="doctors")
    specialization = models.CharField(max_length=255)

    def __str__(self):
        return f"Врач {self.doctor_name} (ID: {self.doctor_id}), учреждение: {self.organization_name}, ключ аутентификации: {self.public_key}, специализация: {self.specialization}"


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

    def __str__(self):
        return f"Запрос {self.request_id} {self.request_date} от {self.doctor.name} к {self.patient_name}, статус: {self.status}"


class ActionLog(models.Model):
    log_id = models.AutoField(primary_key=True)
    # patient_name = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="action_logs")
    # doctor_name = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name="action_logs")
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="action_logs")
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name="action_logs")
    action_type = models.CharField(max_length=50)
    action_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Действие {self.action_type} (ID: {self.log_id}) врачом {self.doctor_name} для пациента {self.patient_name} от {self.action_date}"
