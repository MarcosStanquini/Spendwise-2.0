from users.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = User
        fields = ['id', 'name', 'username', 'password' ]
        extra_kwargs = {
            'password': {'write_only': True}

        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    

    def update(self, instance, validated_data):
        # Atualize os campos do modelo conforme necessário
        instance.name = validated_data.get('name', instance.name)
        instance.username = validated_data.get('username', instance.username)

        # Atualize a senha se estiver presente nos dados validados
        password = validated_data.get('password', None)
        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance

   


