from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers import AuthorizedDoctorsListSerializer


class AuthorizedDoctorsListView(APIView):
    @extend_schema(
        summary="Запрос на получение списка врачей с доступом",
        description="Возвращает перечень врачей, которым пациент предоставил доступ к своим данным.",
        responses={status.HTTP_200_OK: AuthorizedDoctorsListSerializer(many=True)},
    )
    def get(self, request, patient_id):
        # Заглушка данных TODO: сделать обращение к базе
        response_data = [
            {
                "doctor_id": 1,
                "doctor_name": "Иванов Иван Иванович",
                "organization_id": 1,
                "organization_name": "Поликлиника №1",
                "access_date": "2024-06-15T13:00:27+03:00"
            },
            {
                "doctor_id": 2,
                "doctor_name": "Петров Петр Петрович",
                "organization_id": 25,
                "organization_name": "Санкт-Петербургская Клиническая Больница Российской Академии Наук",
                "access_date": "2024-10-20T13:00:27+03:00"
            }
        ]

        serializer = AuthorizedDoctorsListSerializer(response_data, many=True)
        return Response(response_data, status=status.HTTP_200_OK)
