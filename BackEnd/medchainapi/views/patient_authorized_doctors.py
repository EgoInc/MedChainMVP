from drf_spectacular.utils import extend_schema, OpenApiResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import AccessRequest, Patient


class AuthorizedDoctorsListView(APIView):
    @extend_schema(
        summary="Получение списка врачей с доступом",
        description="Возвращает список врачей, которым пациент предоставил доступ к своим данным. "
                    "Список содержит информацию о враче, организации, и дате предоставления доступа.",
        responses={
            status.HTTP_200_OK: OpenApiResponse(
                description="Список врачей с доступом.",
                response={
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "doctor_id": {"type": "integer", "example": 1},
                            "doctor_name": {"type": "string", "example": "Иван Иванов"},
                            "organization_id": {"type": "integer", "example": 10},
                            "organization_name": {"type": "string", "example": "Городская больница №1"},
                            "access_date": {"type": "string", "format": "date-time",
                                            "example": "2024-12-10T14:48:00Z"},
                        },
                    },
                },
            ),
            status.HTTP_404_NOT_FOUND: OpenApiResponse(
                description="Пациент не найден.",
                response={
                    "type": "object",
                    "properties": {
                        "detail": {"type": "string", "example": "Пациент не найден."},
                    },
                },
            ),
        }
    )
    def get(self, request, patient_id):
        # Проверяем, существует ли пациент
        try:
            Patient.objects.get(patient_id=patient_id)
        except Patient.DoesNotExist:
            return Response(
                {"detail": "Пациент не найден."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Получаем запросы доступа для пациента с подтвержденным статусом
        patient_requests = AccessRequest.objects.filter(
            patient_id=patient_id,
            status='подтверждено'
        )

        # Формируем данные для сериализации
        data = [
            {
                "doctor_id": access_request.doctor.doctor_id,
                "doctor_name": access_request.doctor.doctor_name,
                "organization_id": access_request.doctor.organization.organization_id,
                "organization_name": access_request.doctor.organization.organization_name,
                "access_date": access_request.request_date,  # Или другое поле для даты доступа
            }
            for access_request in patient_requests
        ]

        return Response(data, status=status.HTTP_200_OK)
