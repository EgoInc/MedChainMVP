from rest_framework import serializers

from .models import Patient, AccessRequest


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
