from django.http import HttpResponse
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Patient, AccessRequest, Doctor
from .serializers import PatientSerializer, AccessRequestSerializer, PatientSearchSerializer, \
    DoctorPatientListSerializer, AddPatientSerializer, AccessRequestsListSerializer, \
    AuthorizedDoctorsListSerializer, RespondSerializer


def home(request):
    host = request.get_host()  # Получаем текущий хост
    return HttpResponse(
        f"""
        <h2>Welcome to the MedChainAPI homepage!</h2>
        <h3>This is an API for managing patients' data :)</h3>
        <h3>Feel free to navigate:</h3>
        <ul>
            <li><a href="http://{host}/api/swagger/">Swagger</a></li>
            <li><a href="http://{host}/admin/">Admin Panel</a></li>
            <li><a href="http://{host}/api/docs/">API Docs</a></li>
            <li><a href="http://{host}/api/schema/">Schema (download)</a></li>
            <li><a href="http://{host}/api/">API Root (this page)</a></li>
        </ul>
        """
    )


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


class AccessRequestView(APIView):
    @extend_schema(
        summary="Запрос на доступ к данным пациента",
        description="Позволяет врачу отправить запрос на доступ к данным пациента.",
        request=AccessRequestSerializer,
        responses={status.HTTP_201_CREATED: AccessRequestSerializer},
    )
    def post(self, request, doctor_id):
        # Получаем данные врача и пациента из запроса
        doctor_id = request.data.get('doctor_id')
        patient_id = request.data.get('patient_id')

        try:
            doctor = Doctor.objects.get(doctor_id=doctor_id)
            patient = Patient.objects.get(patient_id=patient_id)
        except Patient.DoesNotExist:
            # Если пациента нет, возвращаем ошибку 404
            return Response({"detail": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)
        except Doctor.DoesNotExist:
            # Если доктора нет, возвращаем ошибку 404
            return Response({"detail": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)

        # Проверяем, есть ли уже активный запрос от этого врача
        existing_request = AccessRequest.objects.filter(
            doctor=doctor, patient=patient, status='ожидание'
        ).first()

        if existing_request:
            return Response({"detail": "Request already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Создаем новый запрос
        access_request = AccessRequest.objects.create(
            doctor=doctor,
            patient=patient,
            status='ожидание'
        )

        # Сериализуем данные запроса
        serializer = AccessRequestSerializer(access_request)

        # Возвращаем созданный запрос с кодом 201
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PatientSearchView(APIView):
    @extend_schema(
        summary="Поиск пациентов",
        description="Позволяет врачу найти пациентов по имени, дате рождения или полному ФИО.",
        request=PatientSearchSerializer,
        responses={status.HTTP_200_OK: PatientSearchSerializer(many=True)},
    )
    def get(self, request, doctor_id):
        # Заглушка данных TODO: сделать обращение к базе
        # response_data = [
        #     {
        #         "patient_id": 1,
        #         "name": "Иванов Иван Иванович",
        #         "date_of_birth": "2000-06-01T00:00:00+03:00",
        #         "contract_address": "0x0000000000000000000000000000000000000000"
        #     },
        #     {
        #         "patient_id": 101,
        #         "name": "Иванов Иван Алексеевич",
        #         "date_of_birth": "2011-08-03T00:00:00+03:00",
        #         "contract_address": "0x1100000000000000000000000000000000000011"
        #     }
        # ]
        # serializer = PatientSearchSerializer(response_data, many=True)
        # return Response(serializer.data, status=status.HTTP_200_OK)

        # Фильтрация пациентов по имени и дате рождения
        queryset = Patient.objects.all()
        if username is not None:
            queryset = queryset.filter(purchaser__username=username)

        user = self.request.user
        response_data = Patient.objects.filter(id=doctor_id)

        # Сериализация данных
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
                "name": "Иванов Иван Иванович",
                "date_of_birth": "2000-06-01T00:00:00+03:00",
                "contract_address": "0x0000000000000000000000000000000000000000",
                "access_granted_date": "2024-08-22T15:00:00+03:00",
            }
        ]

        serializer = DoctorPatientListSerializer(response_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddPatientView(APIView):
    @extend_schema(
        summary="Добавление пациента",
        description="Позволяет зарегистрировать нового пациента",
        request=AddPatientSerializer,
        responses={status.HTTP_201_CREATED: AddPatientSerializer,
                   status.HTTP_400_BAD_REQUEST: 'Неверные данные'},
    )
    def post(self, request, name, date_of_birth, contract_adress):
        request_data = {
            "name": "Полное имя пациента. Тип: string",
            "date_of_birth": "Дата рождения пациента. Тип: string (ISO 8601)",
            "contract_address": "Адрес смарт-контракта пациента в блокчейне. Тип: string"
        }
        serializer = AddPatientSerializer(data=request_data)
        # TODO: реализовать логику добавления пациента
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AccessRequestsListView(APIView):
    @extend_schema(
        summary="Список запросов на доступ",
        description="Позволяет посмотреть список запросов на доступ к данным пациента",
        responses={status.HTTP_200_OK: AccessRequestsListSerializer(many=True)}
    )
    def get(self, request, patient_id):
        # TODO: реализовать логику просмотра списка запросов на доступ

        response_data = [
            {
                "request_id": 1,
                "doctor": "Иванов Иван Иванович",
                "status": "подтверждено",
                "request_date": "2024-06-15T13:00:27+03:00"
            },
            {
                "request_id": 2,
                "doctor": "Петров Петр Петрович",
                "status": "отклонено",
                "request_date": "2024-11-04T10:15:27+03:00"
            },
            {
                "request_id": 3,
                "doctor": "Сергеев Сергей Сергеевич",
                "status": "ожидание",
                "request_date": "2024-11-05T14:48:27+03:00"
            }
        ]
        serializer = AccessRequestsListSerializer(response_data, many=True)
        return Response(response_data, status=status.HTTP_200_OK)


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


class RespondView(APIView):
    @extend_schema(
        summary="Запрос на подтверждение или отклонение доступа",
        description="Позволяет пациенту подтвердить или отклонить запрос на доступ к его данным",
        request=RespondSerializer,
        responses={status.HTTP_200_OK: RespondSerializer},
    )
    def post(self, request, patient_id, request_id):
        serializer = RespondSerializer(data={**request.data, 'patient_id': patient_id, 'request_id': request_id})

        # TODO: обращение к бд
        response_data = {"message": "Запрос подтвержден"}
        serializer = RespondSerializer(response_data)
        return Response(response_data, status=status.HTTP_200_OK)
