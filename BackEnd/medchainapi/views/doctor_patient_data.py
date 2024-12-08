from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers import PatientSearchSerializer, PatientSerializer


class PatientDataView(APIView):
    @extend_schema(
        summary="Получение данных пациента",
        description="Позволяет врачу получить базовые данные о пациенте для подтверждения его личности.",
        request=PatientSearchSerializer,
        responses={status.HTTP_200_OK: PatientSerializer},
    )
    def get(self, request, doctor_id, patient_id):
        try:
            # Пытаемся получить пациента по id
            patient_data = Patient.objects.get(patient_id=patient_id)
        except Patient.DoesNotExist:
            # Если пациента нет, возвращаем ошибку 404
            return Response({"detail": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)

        # Сериализуем данные пациента
        serializer = PatientSerializer(patient_data)

        # Возвращаем данные пациента с кодом 200
        return Response(serializer.data, status=status.HTTP_200_OK)
