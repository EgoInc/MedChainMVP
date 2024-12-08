from drf_spectacular.utils import extend_schema, OpenApiResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Doctor, AccessRequest
from ..serializers import DoctorPatientListSerializer


class DoctorPatientListView(APIView):
    @extend_schema(
        summary="Список пациентов конкретного доктора",
        description="Возвращает список пациентов, доступ к данным которых был подтвержден для указанного врача.",
        responses={
            status.HTTP_200_OK: OpenApiResponse(
                description="Список пациентов, доступ к которым подтверждён.",
                response={
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "id": {"type": "integer", "example": 1},
                            "name": {"type": "string", "example": "Eddard Stark"},
                            "date_of_birth": {"type": "string", "format": "date", "example": "1962-07-30"},
                            "patient_id": {"type": "integer", "example": 101},
                        },
                    },
                },
            ),
            status.HTTP_204_NO_CONTENT: OpenApiResponse(
                description="Доктор найден, но у него нет подтверждённых пациентов.",
                response={
                    "type": "object",
                    "properties": {
                        "detail": {"type": "string", "example": "У доктора еще нет пациентов."},
                    },
                },
            ),
            status.HTTP_404_NOT_FOUND: OpenApiResponse(
                description="Доктор не найден.",
                response={
                    "type": "object",
                    "properties": {
                        "detail": {"type": "string", "example": "Доктор не найден."},
                    },
                },
            ),
        },
    )
    def get(self, request, doctor_id):
        # Проверяем, существует ли доктор
        try:
            doctor = Doctor.objects.get(doctor_id=doctor_id)
        except Doctor.DoesNotExist:
            return Response(
                {"detail": "Доктор не найден."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Получаем список подтверждённых пациентов
        confirmed_requests = AccessRequest.objects.filter(
            doctor=doctor,
            status='подтверждено'
        ).select_related('patient')

        # Извлекаем пациентов из запросов доступа
        patients = [request.patient for request in confirmed_requests]

        # Сериализуем данные
        serializer = DoctorPatientListSerializer(patients, many=True)

        # Если список пустой
        if not patients:
            return Response({"detail": "У доктора еще нет пациентов."}, status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.data, status=status.HTTP_200_OK)
