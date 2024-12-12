from rest_framework import serializers

from .models import Patient, AccessRequest, Doctor


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['patient_id', 'patient_name', 'date_of_birth', 'contract_address']


class CreatePatientSerializer(serializers.Serializer):
    patient_name = serializers.CharField(max_length=255, required=True)
    date_of_birth = serializers.DateField(required=True)
    contract_address = serializers.CharField(max_length=42, required=True)


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['doctor_id', 'doctor_name', 'public_key', 'organization', 'specialization']


class CreateDoctorSerializer(serializers.Serializer):
    doctor_name = serializers.CharField(required=True, max_length=255)
    public_key = serializers.CharField(required=True, max_length=255)  # Публичный ключ для аутентификации
    organization_id = serializers.IntegerField(required=True)
    specialization = serializers.CharField(required=True, max_length=255)


class PatientFilterSerializer(serializers.Serializer):
    patient_name = serializers.CharField(required=True, allow_blank=False)
    date_of_birth = serializers.DateField(required=False, allow_null=True)
    patient_id = serializers.IntegerField(required=False, allow_null=True)


class AccessRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessRequest
        fields = ['request_id']


class PatientSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['patient_id', 'patient_name', 'date_of_birth', 'contract_address']


class DoctorPatientListSerializer(serializers.ModelSerializer):
    # TODO: Сделать работающее получение access_granted_date
    access_granted_date = serializers.DateTimeField(source='access_requests.first.request_date', read_only=True)

    class Meta:
        model = Patient
        fields = ['patient_id', 'patient_name', 'date_of_birth', 'contract_address', 'access_granted_date']


class AddPatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['patient_id', 'patient_name', 'date_of_birth', 'contract_address']


class AccessRequestsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessRequest
        fields = ['request_id', 'doctor', 'status', 'request_date']


class PatientIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['patient_id']


class AccessRequestListSerializer(serializers.Serializer):
    request_id = serializers.IntegerField(required=True)
    doctor = serializers.CharField(required=True)
    status = serializers.CharField(max_length=20)
    request_date = serializers.DateTimeField(required=True)


class AccessRespondSerializer(serializers.Serializer):
    patient_id = serializers.IntegerField(required=True)
    request_id = serializers.IntegerField(required=True)
    approve = serializers.BooleanField(required=True)


class AuthorizedDoctorsListSerializer(serializers.ModelSerializer):
    doctor_id = serializers.IntegerField(source='doctor_id', read_only=True)
    doctor_name = serializers.CharField(source='doctor_name', read_only=True)
    organization_id = serializers.IntegerField(source='organization.organization_id', read_only=True)
    organization_name = serializers.CharField(source='organization.organization_name', read_only=True)
    access_date = serializers.DateTimeField(required=True)

    class Meta:
        model = Doctor
        fields = [
            "doctor_id",
            "doctor_name",
            "organization_id",
            "organization_name",
            "access_date"
        ]
