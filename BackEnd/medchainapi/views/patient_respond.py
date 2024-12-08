from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers import RespondSerializer


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
