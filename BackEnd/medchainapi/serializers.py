from rest_framework import serializers

from .models import Patient, AccessRequest, Doctor


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['patient_id', 'patient_name', 'date_of_birth', 'contract_address']


class PatientFilterSerializer(serializers.Serializer):
    name = serializers.CharField(required=False, allow_blank=True)
    date_of_birth = serializers.DateField(required=False, allow_null=True)

    @staticmethod
    def validate_doctor_id(value):
        # Проверяем, существует ли указанный доктор
        if not Doctor.objects.filter(id=value).exists():
            raise serializers.ValidationError("Указанный доктор не найден.")
        return value


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


class AuthorizedDoctorsListSerializer(serializers.ModelSerializer):
    # access_date получает первое значение из связанных access_requests
    access_date = serializers.DateTimeField(source='access_requests.first.request_date', read_only=True)

    # Получаем имя организации через ForeignKey
    organization_name = serializers.CharField(source='organization.organization_name', read_only=True)
    organization_id = serializers.IntegerField(source='organization.id', read_only=True)

    class Meta:
        model = Doctor
        fields = ['doctor_id', 'doctor_name', 'organization_id', 'organization_name', 'specialization', 'access_date']


class RespondSerializer(serializers.Serializer):
    # class Meta:
    #     approve = serializers.BooleanField()
    #     model = AccessRequest
    #     fields = ['request_id', 'patient_id', 'approve']
    # TODO: выполнить проверку существования запроса

    message = serializers.CharField(max_length=255)
