from django.http import HttpResponse
from drf_spectacular.utils import extend_schema, OpenApiExample, OpenApiParameter, OpenApiResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *


def home(request):
    host = request.get_host()  # Получаем текущий хост
    return HttpResponse(
        f"""
        <h2>Welcome to the MedChainAPI homepage!</h2>
        <h3>This is an API for managing patients' data :)</h3>
        <h3>Feel free to navigate:</h3>
        <ul>
            <li><a href="http://{host}/api/docs/"><b>API Docs</b></a></li>
            <li><a href="http://{host}/admin/">Admin Panel</a></li>
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
        parameters=[
            OpenApiParameter(
                name="doctor_id",
                type=int,
                location=OpenApiParameter.PATH,
                description="Уникальный идентификатор врача.",
                required=True,
            ),
        ],
        request={
            "application/json": {
                "type": "object",
                "properties": {
                    "doctor_id": {"type": "integer", "description": "Уникальный идентификатор врача."},
                    "patient_id": {"type": "integer", "description": "Уникальный идентификатор пациента."},
                },
                "required": ["doctor_id", "patient_id"],
            },
        },
        responses={
            status.HTTP_201_CREATED: OpenApiResponse(
                description="Запрос успешно создан.",
                response=AccessRequestSerializer,
            ),
            status.HTTP_400_BAD_REQUEST: OpenApiResponse(
                description="Запрос уже существует.",
                response={
                    "type": "object",
                    "properties": {
                        "detail": {"type": "string", "example": "Request already exists"},
                    },
                },
            ),
            status.HTTP_404_NOT_FOUND: OpenApiResponse(
                description="Доктор или пациент не найден.",
                response={
                    "type": "object",
                    "properties": {
                        "detail": {"type": "string", "example": "Patient not found"},
                    },
                },
            ),
        },
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
