from drf_spectacular.utils import extend_schema, OpenApiExample, OpenApiResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Patient
from ..serializers import PatientSearchSerializer, PatientFilterSerializer


class PatientSearchView(APIView):
    @extend_schema(
        summary="Поиск пациентов",
        description="Позволяет врачу найти пациентов по имени, фамилии и/или дате рождения.",
        request=PatientSearchSerializer,  # Указываем структуру тела запроса
        responses={
            status.HTTP_200_OK: OpenApiResponse(
                description="Список пациентов, найденных по запросу",
                response={
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "patient_id": {"type": "integer", "example": 101},
                            "patient_name": {"type": "string", "example": "Eddard Stark"},
                            "date_of_birth": {"type": "string", "format": "date", "example": "1962-07-30"},
                        },
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
    def post(self, request, doctor_id):
        serializer = PatientFilterSerializer(data=request.data)

        # Отправлен плохой запрос
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Получаем данные из запроса
        patient_name = serializer.validated_data.get('patient_name', '')
        date_of_birth = serializer.validated_data.get('date_of_birth', None)
        patient_id = serializer.validated_data.get('patient_id', None)

        # Получаем данные всех пациентов
        queryset = Patient.objects.all()

        if patient_name:
            queryset = queryset.filter(patient_name__icontains=patient_name)

        # Применяем фильтр по дате рождения и patient_id, если они указана
        if date_of_birth:
            queryset = queryset.filter(date_of_birth=date_of_birth)

        if patient_id:
            queryset = queryset.filter(patient_id=patient_id)

        if not queryset:
            return Response({"detail": "По данным запроса пациентов не найдено."}, status=status.HTTP_404_NOT_FOUND)

        # Пример возврата результатов
        serializer = PatientSearchSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
