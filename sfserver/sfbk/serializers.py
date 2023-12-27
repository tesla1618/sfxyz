from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model, authenticate
from djoser.serializers import UserCreateSerializer, UserSerializer

UserModel = get_user_model()

class RegisteredEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisteredEvent
        fields = '__all__'
        
class InterestedEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisteredEvent
        fields = '__all__'

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = UserModel
        fields = ('id', 'email', 'username', 'password')
        # extra_kwargs = {'password': {'write_only': True}}

# class UserRegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserModel
#         fields = '__all__'
#     def create(self, clean_data):
#         user_obj = UserModel.objects.create_user(username = clean_data['username'], email=clean_data['email'], password=clean_data['password'])
#         user_obj.username = clean_data['username']
#         user_obj.save()
#         return user_obj

# class UserLoginSerializer(serializers.Serializer):
#     password = serializers.CharField()
#     username = serializers.CharField()
	
#     def check_user(self, clean_data):
#         user = authenticate(username=clean_data['username'], password=clean_data['password'])
#         if not user:
#             raise ValidationError('user not found')
#         return user

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserModel
#         fields = ('email', 'username')


class EventImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventImage
        fields = '__all__'

class EventSpeakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventSpeaker
        fields = '__all__'

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('id', 'username')

# class EventAttendanceSerializer(serializers.ModelSerializer):
#     user_details = UserSerializer(source='user', read_only=True)
#     class Meta:
#         model = EventAttendance
#         fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    images = EventImageSerializer(many=True, read_only=True)
    speakers = EventSpeakerSerializer(many=True, read_only=True)
    registered = RegisteredEventSerializer(many=True, read_only=True)
    interested = InterestedEventSerializer(many=True, read_only=True)
    class Meta:
        model = Event
        fields = '__all__'
