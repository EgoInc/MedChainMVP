from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Patient, Doctor, AccessRequest
from ..serializers import AccessRequestSerializer


class AccessRequestView(APIView):
    @extend_schema(
        summary="Запрос на доступ к данным пациента",
        description="Позволяет врачу отправить запрос на доступ к данным пациента.",
        parameters=[
            OpenApiParameter(
                name="doctor_id",
                type=int,
                location=OpenApiParameter.PATH,
                description="Уникальный идентификатор врача.",
                required=True,
            ),
        ],
        request={
            "application/json": {
                "type": "object",
                "properties": {
                    "doctor_id": {"type": "integer", "description": "Уникальный идентификатор врача."},
                    "patient_id": {"type": "integer", "description": "Уникальный идентификатор пациента."},
                },
                "required": ["doctor_id", "patient_id"],
            },
        },
        responses={
            status.HTTP_201_CREATED: OpenApiResponse(
                description="Запрос успешно создан.",
                response=AccessRequestSerializer,
            ),
            status.HTTP_400_BAD_REQUEST: OpenApiResponse(
                description="Запрос уже существует.",
                response={
                    "type": "object",
                    "properties": {
                        "detail": {"type": "string", "example": "Request already exists"},
                    },
                },
            ),
            status.HTTP_404_NOT_FOUND: OpenApiResponse(
                description="Доктор или пациент не найден.",
                response={
                    "type": "object",
                    "properties": {
                        "detail": {"type": "string", "example": "Пациент / Доктор не найден"},
                    },
                },
            ),
        },
    )
    def post(self, request, doctor_id):
        # Получаем данные врача и пациента из запроса
        doctor_id = request.data.get('doctor_id')
        patient_id = request.data.get('patient_id')

        try:
            doctor = Doctor.objects.get(doctor_id=doctor_id)
            patient = Patient.objects.get(patient_id=patient_id)
        except Patient.DoesNotExist:
            # Если пациента нет, возвращаем ошибку 404
            return Response({"detail": "Пациент не найден"}, status=status.HTTP_404_NOT_FOUND)
        except Doctor.DoesNotExist:
            # Если доктора нет, возвращаем ошибку 404
            return Response({"detail": "Доктор не найден"}, status=status.HTTP_404_NOT_FOUND)

        # Проверяем, есть ли уже активный запрос от этого врача
        existing_request = AccessRequest.objects.filter(
            doctor=doctor, patient=patient, status='ожидание'
        ).first()

        if existing_request:
            return Response({"detail": "Request already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Создаем новый запрос
        access_request = AccessRequest.objects.create(
            doctor=doctor,
            patient=patient,
            status='ожидание'
        )

        # Сериализуем данные запроса
        serializer = AccessRequestSerializer(access_request)

        # Возвращаем созданный запрос с кодом 201
        return Response(serializer.data, status=status.HTTP_201_CREATED)
