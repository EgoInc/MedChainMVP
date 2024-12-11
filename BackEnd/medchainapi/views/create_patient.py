from django.db.utils import IntegrityError
from drf_spectacular.utils import extend_schema, OpenApiResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Patient
from ..serializers import CreatePatientSerializer, PatientSerializer


def create_patient(validated_data):
    patient_name = validated_data.get("patient_name")
    date_of_birth = validated_data.get("date_of_birth")
    contract_address = validated_data.get("contract_address")

    try:
        # Создание пациента
        patient = Patient.objects.create(
            patient_name=patient_name,
            date_of_birth=date_of_birth,
            contract_address=contract_address,
        )
        return patient, None

    except IntegrityError as e:
        error_message = str(e).replace('\n', '')
        return None, Response(
            {"detail": f"Integrity error occurred: {error_message}"},
            status=status.HTTP_400_BAD_REQUEST,
        )


def validate_and_extract(request, serializer_class):
    serializer = serializer_class(data=request.data)
    if not serializer.is_valid():
        return None, Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return serializer.validated_data, None


class CreatePatientView(APIView):
    @extend_schema(
        summary="Создает нового пациента",
        description="Позволяет добавить нового пациента в базу данных с указанием имени, даты рождения и адреса "
                    "контракта в блокчейне.",
        request=CreatePatientSerializer,
        responses={
            status.HTTP_201_CREATED: OpenApiResponse(
                description="Пациент успешно создан.",
                response={
                    "type": "object",
                    "properties": {
                        "id": {"type": "integer", "example": 1},
                        "patient_name": {"type": "string", "example": "Джон Смит"},
                        "date_of_birth": {"type": "string", "format": "date", "example": "1980-12-25"},
                        "contract_address": {"type": "string", "example": "0x1234567890abcdef1234567890abcdef12345678"},
                    },
                },
            ),
            status.HTTP_400_BAD_REQUEST: OpenApiResponse(
                description="Ошибка валидации или нарушение уникальности адреса контракта.",
                response={
                    "type": "object",
                    "properties": {
                        "detail": {
                            "type": "string",
                            "example": "Patient with contract_address 0x0000 already exists.",
                        },
                    },
                },
            ),
        },
    )
    def post(self, request):
        # Валидация и извлечение данных
        validated_data, error_response = validate_and_extract(request, CreatePatientSerializer)
        if error_response:
            return error_response

        # Создание пациента
        new_patient, error_response = create_patient(validated_data)
        if error_response:
            return error_response

        # Ответ с сериализованными данными
        return Response(PatientSerializer(new_patient).data, status=status.HTTP_201_CREATED)
