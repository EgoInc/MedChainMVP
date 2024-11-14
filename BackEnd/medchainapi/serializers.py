from rest_framework import serializers

from .models import Patient, AccessRequest, Doctor


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['patient_id', 'name', 'date_of_birth', 'contract_address']


class AccessRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessRequest
        fields = ['request_id']


class PatientSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['patient_id', 'name', 'date_of_birth', 'contract_address']


class DoctorPatientListSerializer(serializers.ModelSerializer):
    # TODO: Сделать работающее получение access_granted_date
    access_granted_date = serializers.DateTimeField(source='access_requests.first.request_date', read_only=True)

    class Meta:
        model = Patient
        fields = ['patient_id', 'name', 'date_of_birth', 'contract_address', 'access_granted_date']


class AddPatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['patient_id', 'name', 'date_of_birth', 'contract_address']


class AccessRequestsListSerializer(serializers.Serializer):
    class Meta:
        model = AccessRequest
        fields = ['request_id', 'doctor', 'status', 'request_date']


class DeletePatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['patient_id']


class DoctorSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['doctor_id', 'name', 'specialization']


class ManageAccessSerializer(serializers.ModelSerializer):
    is_blocked = serializers.BooleanField(required=False)

    # TODO: реализовать блокировку врачей пациентами
    class Meta:
        model = AccessRequest
        fields = ['request_id', 'is_blocked']  # TODO: Реализовать правильные поля
