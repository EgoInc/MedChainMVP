from rest_framework import serializers

from models import Patient, Doctor, AccessRequest, MedicalOrganization, ActionLog


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['patient_id', 'name', 'date_of_birth', 'contact_address']


class MedicalOrganizationSerializer(serializers.Serializer):
    class Meta:
        model = MedicalOrganization
        fields = ['organization_id', 'name', 'address', 'contact_info']


class DoctorSerializer(serializers.ModelSerializer):
    organization_id = serializers.SlugRelatedField(slug_field='organization_id', read_only=True)

    class Meta:
        model = Doctor
        fields = ['doctor_id', 'name', 'public_key', 'organization_id']


class AccessRequestSerializer(serializers.ModelSerializer):
    doctor_id = serializers.SlugRelatedField(slug_field='doctor_id', read_only=True)
    patient_id = serializers.SlugRelatedField(slug_field='patient_id', read_only=True)

    class Meta:
        model = AccessRequest
        fields = ['request_id', 'doctor_id', 'patient_id', 'status', 'request_date']


class ActionLogSerializer(serializers.ModelSerializer):
    doctor_id = serializers.SlugRelatedField(slug_field='doctor_id', read_only=True)
    patient_id = serializers.SlugRelatedField(slug_field='patient_id', read_only=True)

    class Meta:
        model = ActionLog
        fields = ['log_id', 'patient_id', 'doctor_id', 'action_type', 'action_date']
