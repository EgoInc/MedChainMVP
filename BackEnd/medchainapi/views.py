from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import PatientSerializer, AccessRequestSerializer, PatientSearchSerializer, \
    DoctorPatientListSerializer


class PatientDataView(APIView):
    @extend_schema(
        summary="Получение данных пациента",
        description="Позволяет врачу получить базовые данные о пациенте для подтверждения его личности.",
        request=PatientSearchSerializer,
        responses={status.HTTP_200_OK: PatientSerializer},
    )
    def get(self, request, doctor_id, patient_id):
        # Заглушка данных TODO: сделать обращение к базе
        patient_data = {
            "patient_id": 1,
            "name": "Иванов Иван Иванович",
            "date_of_birth": "2006-12-01",
            "contract_address": "0x0000000000000000000000000000000000000000",
        }
        serializer = PatientSerializer(patient_data)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AccessRequestView(APIView):
    @extend_schema(
        summary="Запрос на доступ к данным пациента",
        description="Позволяет врачу отправить запрос на доступ к данным пациента.",
        request=AccessRequestSerializer,
        responses={status.HTTP_201_CREATED: AccessRequestSerializer},
    )
    def post(self, request, doctor_id):
        # Заглушка данных TODO: сделать обращение к базе
        request_data = {
            "request_id": 127
        }
        serializer = AccessRequestSerializer(request_data)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PatientSearchView(APIView):
    @extend_schema(
        summary="Поиск пациентов",
        description="Позволяет врачу найти пациентов по имени, дате рождения или полному ФИО.",
        request=PatientSearchSerializer,
        responses={status.HTTP_200_OK: PatientSearchSerializer(many=True)},
    )
    def get(self, request, doctor_id):
        # Заглушка данных TODO: сделать обращение к базе
        response_data = [
            {
                "patient_id": 1,
                "name": "Иванов Иван Иванович",
                "date_of_birth": "2000-06-01T00:00:00+03:00",
                "contract_address": "0x0000000000000000000000000000000000000000"
            },
            {
                "patient_id": 101,
                "name": "Иванов Иван Алексеевич",
                "date_of_birth": "2011-08-03T00:00:00+03:00",
                "contract_address": "0x1100000000000000000000000000000000000011"
            }
        ]
        serializer = PatientSearchSerializer(response_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DoctorPatientListView(APIView):
    @extend_schema(
        summary="Список пациентов конкретного доктора",
        description="Возвращает список пациентов, доступ к данным которых был подтвержден для данного врача.",
        responses={status.HTTP_200_OK: DoctorPatientListSerializer(many=True)},
    )
    def get(self, request, doctor_id):
        # Заглушка данных TODO: сделать обращение к базе
        response_data = [
            {
                "patient_id": 101,
                "name": "Иванов Иван Иванович",
                "date_of_birth": "2000-06-01T00:00:00+03:00",
                "contract_address": "Адрес смарт-контракта пациента в блокчейне. Тип: string",
                "access_granted_date": "2024-12-24T12:00:00+03:00"
            },
            {
                "patient_id": 101,
                "name": "Петров Петр Петрович",
                "date_of_birth": "2000-06-01T00:00:00+03:00",
                "contract_address": "0x0000000000000000000000000000000000000000",
                "access_granted_date": "2024-08-22T15:00:00+03:00",
            }
        ]

        serializer = DoctorPatientListSerializer(response_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
