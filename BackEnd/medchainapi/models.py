from django.db import models


class Patient(models.Model):
    patient_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    contact_address = models.CharField(max_length=42, unique=True)  # Адрес в блокчейне

    def __str__(self):
        return f"Пациент {self.name} (ID: {self.patient_id})"


class MedicalInstitution(models.Model):
    organization_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    contact_info = models.CharField(max_length=255)

    def __str__(self):
        return f"Медицинское учреждение: {self.name} (ID: {self.organization_id})"


class Doctor(models.Model):
    doctor_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    public_key = models.CharField(max_length=255, unique=True)  # Публичный ключ для аутентификации
    organization = models.ForeignKey(MedicalInstitution, on_delete=models.CASCADE, related_name="doctors")

    def __str__(self):
        return f"Врач {self.name} (ID: {self.doctor_id}), учреждение: {self.organization.name}"


class AccessRequest(models.Model):
    request_id = models.AutoField(primary_key=True)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name="access_requests")
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="access_requests")
    status = models.CharField(max_length=50)  # Статус запроса
    request_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Запрос {self.request_id} от {self.doctor.name} к {self.patient.name}, статус: {self.status}"


class ActionLog(models.Model):
    log_id = models.AutoField(primary_key=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="action_logs")
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name="action_logs")
    action_type = models.CharField(max_length=50)
    action_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Действие {self.action_type} (ID: {self.log_id}) врачом {self.doctor.name} для пациента {self.patient.name} от {self.action_date}"
