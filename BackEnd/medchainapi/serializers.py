from rest_framework import serializers


class PatientDataSerializer(serializers.Serializer):
    patient_id = serializers.IntegerField()
    name = serializers.CharField(max_length=255)
    date_of_birth = serializers.DateField()
    contract_address = serializers.CharField(max_length=42)
