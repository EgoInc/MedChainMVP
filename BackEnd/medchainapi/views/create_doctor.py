from django.db.utils import IntegrityError
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema, OpenApiResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Doctor, MedicalOrganization
from ..serializers import CreateDoctorSerializer, DoctorSerializer


def create_doctor(validated_data):
    doctor_name = validated_data.get("doctor_name")
    public_key = validated_data.get("public_key")
    organization_id = validated_data.get("organization_id")
    specialization = validated_data.get("specialization")

    # Проверяем существование организации
    organization = get_object_or_404(MedicalOrganization, pk=organization_id)

    try:
        # Создаем доктора
        doctor = Doctor.objects.create(
            doctor_name=doctor_name,
            public_key=public_key,
            organization=organization,
            specialization=specialization,
        )
        return doctor, None

    except IntegrityError:
        return None, Response(
            {"detail": f"Doctor with public_key {public_key} already exists in database."},
            status=status.HTTP_400_BAD_REQUEST,
        )


def validate_and_extract(request):
    serializer = CreateDoctorSerializer(data=request.data)
    if not serializer.is_valid():
        return None, Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return serializer.validated_data, None


class CreateDoctorView(APIView):
    @extend_schema(
        summary="Создает нового доктора",
        description=(
                "Эндпоинт позволяет добавить нового доктора в базу данных. "
                "Доктор связывается с медицинской организацией по переданному идентификатору."
        ),
        request=CreateDoctorSerializer,
        responses={
            status.HTTP_201_CREATED: OpenApiResponse(
                description="Доктор успешно создан.",
                response={
                    "type": "object",
                    "properties": {
                        "id": {"type": "integer", "example": 1},
                        "doctor_name": {"type": "string", "example": "Daniel Radcliffe"},
                        "public_key": {"type": "string", "example": "0x0000000000000000000000000000000000000042"},
                        "specialization": {"type": "string", "example": "Wizards"},
                        "organization": {
                            "type": "object",
                            "properties": {
                                "id": {"type": "integer", "example": 42},
                                "name": {"type": "string", "example": "City clinic №42"},
                            },
                        },
                    },
                },
            ),
            status.HTTP_400_BAD_REQUEST: OpenApiResponse(
                description="Ошибка валидации входных данных или нарушение уникальности.",
                response={
                    "type": "object",
                    "properties": {
                        "detail": {"type": "string",
                                   "example": "Doctor with public_key 0x0000 already exists in database."},
                    },
                },
            ),
            status.HTTP_404_NOT_FOUND: OpenApiResponse(
                description="Медицинская организация не найдена.",
                response={
                    "type": "object",
                    "properties": {
                        "detail": {"type": "string", "example": "No MedicalOrganization matches the given query."},
                    },
                },
            ),
        },
    )
    def post(self, request):
        # Валидация и извлечение данных
        validated_data, error_response = validate_and_extract(request)
        if error_response:
            return error_response

        # Создание доктора
        new_doctor, error_response = create_doctor(validated_data)
        if error_response:
            return error_response

        # Ответ с сериализованными данными
        return Response(DoctorSerializer(new_doctor).data, status=status.HTTP_200_OK)
