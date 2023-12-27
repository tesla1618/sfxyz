"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from sfbk.views import *
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'speakers', EventSpeakerViewSet)  # Create a custom viewset for EventSpeaker
router.register(r'images', EventImageViewSet)
router.register(r'registered', RegisteredEventViewSet)
router.register(r'registered', InterestedEventViewSet)
# router.register(r'users', UserView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/events/<int:event_id>/speakers/', event_speakers_list, name='event_speakers_list'),
    path('api/events/<int:event_id>/images/', event_images_list, name='event_images_list'),
    path('api/events/<int:event_id>/register/', register_event, name='register_event'),
    path('api/events/<int:event_id>/interest/', interest_event, name='interest_event'),
    path('api/events/<int:event_id>/registered/', event_reg_list, name='event_reg_list'),
    path('api/myevents/<int:user_id>/', event_allreg_list, name='event_allreg_list'),
    path('api/events/<int:event_id>/interested/', event_interested_list, name='event_interested_list'),
    path('api/register/', UserRegister.as_view(), name='register'),
	path('api/login/', UserLogin.as_view(), name='login'),
	path('api/logout/', UserLogout.as_view(), name='logout'),
	path('api/user/', UserView.as_view(), name='user'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    # path('api/images/', views.image_list_api, name='image_list_api'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
