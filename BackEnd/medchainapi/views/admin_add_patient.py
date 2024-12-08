from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers import *


class AddPatientView(APIView):
    @extend_schema(
        summary="Добавление пациента",
        description="Позволяет зарегистрировать нового пациента",
        request=AddPatientSerializer,
        responses={status.HTTP_201_CREATED: AddPatientSerializer,
                   status.HTTP_400_BAD_REQUEST: 'Неверные данные'},
    )
    def post(self, request, name, date_of_birth, contract_address):
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
