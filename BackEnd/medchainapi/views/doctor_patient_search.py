from drf_spectacular.utils import extend_schema, OpenApiExample, OpenApiResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers import PatientSearchSerializer, PatientFilterSerializer


class PatientSearchView(APIView):
    @extend_schema(
        summary="Поиск пациентов",
        description="Позволяет врачу найти пациентов по имени, фамилии и/или дате рождения.",
        request=PatientSearchSerializer,  # Указываем структуру тела запроса
        examples=[
            OpenApiExample(
                "Пример успешного ответа",
                description="Пример ответа с подтверждёнными пациентами.",
                value=[
                    {
                        "id": 1,
                        "name": "Eddard Stark",
                        "date_of_birth": "1962-07-30",
                        "patient_id": 101
                    },
                    {
                        "id": 2,
                        "name": "Robert Baratheon",
                        "date_of_birth": "1960-03-02",
                        "patient_id": 102
                    }
                ],
            ),
            OpenApiExample(
                "Пример ошибки 404",
                description="Доктор с указанным ID не найден.",
                value={
                    "detail": "Доктор не найден."
                },
            ),
        ],
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
            status.HTTP_404_NOT_FOUND: OpenApiResponse(
                description="Доктор не найден или у него нет подтверждённых пациентов.",
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
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        name = serializer.validated_data.get('name', '')
        date_of_birth = serializer.validated_data.get('date_of_birth', None)
        patient_id = serializer.validated_data.get('id', None)

        queryset = Patient.objects.all()

        if name:
            queryset = queryset.filter(patient_name__icontains=name)

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
