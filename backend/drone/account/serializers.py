from .models import Account
from rest_framework import serializers


class AccountSerializer(serializers.ModelSerializer):
    # This is for the API view of the browser, not the admin but through the url.
    class Meta:
        model = Account
        fields = ['id', 'email', 'name', 'username']
