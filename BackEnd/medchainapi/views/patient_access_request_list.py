from drf_spectacular.utils import extend_schema, OpenApiResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers import *


class AccessRequestsListView(APIView):
    @extend_schema(
        summary="Список запросов на доступ к конкретному пациенту",
        description="Позволяет посмотреть список запросов на доступ к данным пациента",
        request=PatientIdSerializer,  # Указываем структуру тела запроса
        responses={
            status.HTTP_200_OK: OpenApiResponse(
                description="Список запросов у данного пациента.",
                response={
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "request_id": {"type": "integer", "example": 0},
                            "doctor": {"type": "string", "example": "Eddard Stark"},
                            "status": {"type": "string", "example": "ожидание"},
                            "date_of_birth": {"type": "string", "format": "date",
                                              "example": "2024-12-11T12:49:44.523077+03:00"},
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
        },
    )
    def get(self, request, patient_id):
        # Проверяем, существует ли пациент
        try:
            patient = Patient.objects.get(patient_id=patient_id)
        except Patient.DoesNotExist:
            return Response(
                {"detail": "Пациент не найден."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Получаем список запросов на доступ к данным пациента
        access_requests = AccessRequest.objects.filter(patient=patient)

        # Сериализуем данные
        serializer = AccessRequestListSerializer(access_requests, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
