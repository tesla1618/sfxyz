from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import generics
from rest_framework import status
from .serializers import *
from .models import *
from django.http import JsonResponse
from django.conf import settings
import os
from rest_framework.decorators import api_view, APIView
from rest_framework.response import Response
# from .validations import *
from rest_framework.filters import SearchFilter, OrderingFilter

from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework import permissions
from rest_framework_simplejwt.tokens import AccessToken

@api_view(['POST'])
def myview(request):
    data = json.loads(request.POST.dict().get('json'))
    access_token = data.get('access_token')
    access_token_obj = AccessToken(access_token)
    user_id = access_token_obj['user_id']


# Create your views here.
def get_special_user():
    special_user_id = 1
    return User.objects.get(id=special_user_id)

@api_view(['POST'])
def register_event(request, event_id):
    permission_classes = (permissions.AllowAny,)

    # Ensure the user is authenticated and authorized as needed
    # if not request.user.is_authenticated:
    #     return Response({'detail': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

    data = request.data
    # data['user'] = user_id  # Assign the authenticated user
    serializer = RegisteredEventSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def interest_event(request, event_id):
    # Ensure the user is authenticated and authorized as needed
    if not request.user.is_authenticated:
        return Response({'detail': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

    data = request.data
    data['user'] = request.user.id  # Assign the authenticated user
    serializer = InterestedEventSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('-created_at')
    serializer_class = EventSerializer
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ['name', 'location', 'city', 'host', 'tags', '=link']
    # order = ['-created_at']

class RegisteredEventViewSet(viewsets.ModelViewSet):
    queryset = RegisteredEvent.objects.all()
    serializer_class = RegisteredEventSerializer

class InterestedEventViewSet(viewsets.ModelViewSet):
    queryset = InterestedEvent.objects.all()
    serializer_class = InterestedEventSerializer

class EventSpeakerViewSet(viewsets.ModelViewSet):
    queryset = EventSpeaker.objects.all()
    serializer_class = EventSpeakerSerializer

class EventImageViewSet(viewsets.ModelViewSet):
    queryset = EventImage.objects.all()
    serializer_class = EventImageSerializer

@api_view(['GET'])
def event_speakers_list(request, event_id):
    speakers = EventSpeaker.objects.filter(event=event_id)
    serializer = EventSpeakerSerializer(speakers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def event_images_list(request, event_id):
    eimgs = EventImage.objects.filter(event=event_id)
    serializer = EventImageSerializer(eimgs, many=True)
    return Response(serializer.data)

def image_list_api(request):
    assets_path = os.path.join(settings.MEDIA_ROOT, 'assets')
    image_files = [filename for filename in os.listdir(assets_path) if filename.endswith(('.jpg', '.png', '.jpeg'))]

    image_urls = [os.path.join(settings.STATIC_URL, 'assets', filename) for filename in image_files]
    return JsonResponse(image_urls, safe=False)

@api_view(['GET'])
def event_reg_list(request, event_id):
    attendances = RegisteredEvent.objects.filter(event=event_id)
    serializer = RegisteredEventSerializer(attendances, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def event_allreg_list(request, user_id):
    attendances = RegisteredEvent.objects.filter(user = user_id)
    print(attendances)
    serializer = RegisteredEventSerializer(attendances, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def event_interested_list(request, event_id):
    attendances = InterestedEvent.objects.filter(event=event_id)
    serializer = InterestedEventSerializer(attendances, many=True)
    return Response(serializer.data)


class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    # permission_classes = (permissions.AllowAny,)
    # authentication_classes = (SessionAuthentication,)
    ##
    def post(self, request):
        data = request.data
        assert validate_username(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)