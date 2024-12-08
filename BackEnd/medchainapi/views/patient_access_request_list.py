from drf_spectacular.utils import extend_schema, OpenApiResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers import *


class AccessRequestsListView(APIView):
    @extend_schema(
        summary="Список запросов на доступ",
        description="Позволяет посмотреть список запросов на доступ к данным пациента",
        responses={
            status.HTTP_200_OK: OpenApiResponse(
                description="Список запросов на доступ к данным пациента.",
                response={
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "id": {"type": "integer", "example": 1},
                            "doctor_id": {"type": "integer", "example": 201},
                            "patient_id": {"type": "integer", "example": 101},
                            "status": {"type": "string", "example": "подтверждено"},
                            "requested_at": {"type": "string", "format": "date-time",
                                             "example": "2023-10-01T12:00:00Z"},
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
            patient = Patient.objects.get(id=patient_id)
        except Patient.DoesNotExist:
            return Response(
                {"detail": "Пациент не найден."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Получаем список запросов на доступ к данным пациента
        access_requests = AccessRequest.objects.filter(patient=patient)

        # Сериализуем данные
        serializer = AccessRequestsListSerializer(access_requests, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
