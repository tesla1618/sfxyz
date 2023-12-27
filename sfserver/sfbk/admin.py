from django.contrib import admin
from .models import *
from unfold.admin import ModelAdmin
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    ...

class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'link', 'date', 'location', 'city', 'capacity', 'isPrivate', 'pkey', 'hasFee', 'entryFee', 'host', 'thumb', 'isCompleted')

@admin.register(Event)
@admin.register(EventImage)
@admin.register(Userprofile)
@admin.register(EventSpeaker)
@admin.register(RegisteredEvent)
@admin.register(InterestedEvent)
@admin.register(UserAccount)
class CustomAdminClass(ModelAdmin):
    pass

# Register your models here.

# admin.site.register(Event, EventAdmin)
# admin.site.register(EventImage)
# admin.site.register(Userprofile)
# admin.site.register(EventSpeaker)
# admin.site.register(EventAttendance)
# admin.site.register(UserAccount)