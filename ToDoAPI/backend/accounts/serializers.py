from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, allow_blank=True)
    password2 = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'username', 'password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password or password2:
            if password != password2:
                raise serializers.ValidationError("Пароли не совпадают")
        return attrs

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        validated_data.pop('password2', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance