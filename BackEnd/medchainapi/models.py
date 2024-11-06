from django.db import models


class Patient(models.Model):
    name = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    contract_address = models.CharField(max_length=42)

    def __str__(self):
        return self.name
