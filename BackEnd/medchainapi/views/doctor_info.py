from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Doctor
from ..serializers import DoctorSerializer


class DoctorInfoView(APIView):
    @extend_schema(
        summary="Запрос на получение данных доктора по id",
        description="Позволяет пациенту отправить запрос на доступ к данным Врача (?)",
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
            status.HTTP_404_NOT_FOUND: OpenApiResponse(
                description="Доктор не найден.",
                response={
                    "type": "object",
                    "properties": {
                        "detail": {"type": "string", "example": "Doctor not found"},
                    },
                },
            ),
            status.HTTP_200_OK: OpenApiResponse(
                description="Запрос выполнен успешно.",
                response=DoctorSerializer,
            ),
        }
    )
    def get(self, request, doctor_id):
        #  Получаем информацию о докторе из базы данных
        try:
            doctor_object = Doctor.objects.get(doctor_id=doctor_id)
        except Doctor.DoesNotExist:
            # Если доктора нет, возвращаем ошибку 404
            return Response({"detail": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)

        doctor_serialized = DoctorSerializer(doctor_object)
        return Response(doctor_serialized.data, status=status.HTTP_200_OK)
