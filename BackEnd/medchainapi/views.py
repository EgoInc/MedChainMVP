from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse

from .serializers import PatientSerializer, AccessRequestSerializer, PatientSearchSerializer, \
    DoctorPatientListSerializer, AddPatientSerializer, AccessRequestsListSerializer, \
    AuthorizedDoctorsListSerializer, RespondSerializer

from .models import AccessRequest

def home(request):
    return HttpResponse("""<h2>Welcome to the MedChainAPI homepage!</h2>
     <h3>This is an API for managing patients' data :)</h3> feel free to navigate: <h5>.../admin/</h5>
<h5>.../api/schema/</h5> 
<h5>.../api/docs/</h5>
<h5>.../api/</h5>
<h5>.../api/swagger/</h5> or try .../api/patient for more """
    )



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

        if serializer.is_valid():
            request_obj = AccessRequest.objects.get(id=request_id)

            if serializer.validated_data['approve']:
                # Логика подтверждения доступа
                request_obj.status = 'approved'  # Например, меняем статус на 'approved'
                request_obj.save()
                return Response({"message": "Запрос подтвержден"}, status=status.HTTP_200_OK)
            else:
                # Логика отклонения доступа
                request_obj.status = 'declined'  # Например, меняем статус на 'declined'
                request_obj.save()
                return Response({"message": "Запрос отклонен"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)