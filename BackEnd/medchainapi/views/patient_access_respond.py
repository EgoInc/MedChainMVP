from drf_spectacular.utils import extend_schema, OpenApiResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import AccessRequest
from ..serializers import AccessRespondSerializer


class AccessRespondView(APIView):
    @extend_schema(
        summary="Ответ пациента на запрос доступа",
        description="Позволяет пациенту подтвердить или отклонить запрос врача на доступ к своим данным.",
        request=AccessRespondSerializer,
        responses={
            status.HTTP_200_OK: OpenApiResponse(
                description="Результат операции: запрос подтвержден / запрос отклонен",
                response={
                    "type": "object",
                    "properties": {
                        "message": {"type": "string", "example": "Запрос подтвержден"}
                    }
                }
            ),
            status.HTTP_400_BAD_REQUEST: OpenApiResponse(
                description="Запрос уже был подтвержден или отклонен.",
                response={
                    "type": "object",
                    "properties": {
                        "detail": {
                            "type": "string",
                            "example": "Запрос уже был подтвержден или отклонен."
                        }
                    }
                }
            ),
            status.HTTP_404_NOT_FOUND: OpenApiResponse(
                description="Запрос не найден.",
                response={
                    "type": "object",
                    "properties": {
                        "detail": {
                            "type": "string",
                            "example": "Запрос не найден."
                        }
                    }
                }
            ),
        }
    )
    def post(self, request, patient_id, request_id):
        # Валидация данных сериализатора
        serialized_data = AccessRespondSerializer(data=request.data)

        if serialized_data.is_valid(raise_exception=True):
            validated_data = serialized_data.validated_data
            request_id = validated_data.get('request_id')
            approve = validated_data.get('approve')

        try:
            access_request = AccessRequest.objects.get(request_id=request_id)
        except AccessRequest.DoesNotExist:
            return Response(
                {"detail": "Запрос не найден"},
                status=status.HTTP_404_NOT_FOUND
            )

        if access_request.status != 'ожидание':
            return Response(
                {"detail": "Запрос уже был подтвержден или отклонен"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Обновление статуса
        access_request.status = 'подтверждено' if approve else 'отклонено'
        access_request.save()

        return Response(
            {"message": "Запрос подтвержден" if approve else "Запрос отклонен"},
            status=status.HTTP_200_OK
        )