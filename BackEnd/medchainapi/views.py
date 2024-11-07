from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import PatientSerializer


class PatientDataView(APIView):
    @extend_schema(
        summary="Получение данных пациента",
        description="Позволяет врачу получить базовые данные о пациенте для подтверждения его личности.",
        responses={status.HTTP_200_OK: PatientSerializer},
    )
    def get(self, request, doctor_id, patient_id):
        # Заглушка данных TODO: сделать обращение к базе
        patient_data = {
            "patient_id": patient_id,
            "name": "Иванов Иван Иванович",
            "date_of_birth": "2000-06-01",
            "contract_address": "0x0000000000000000000000000000000000000000",
        }
        serializer = PatientSerializer(patient_data)
        return Response(serializer.data, status=status.HTTP_200_OK)
