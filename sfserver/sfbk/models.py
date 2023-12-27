from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.text import slugify
import os
from django.core.exceptions import ValidationError
# from django.contrib.auth.models import User,AnonymousUser
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# Create your models here.

class UserAccountManager(BaseUserManager):

    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not name:
            raise ValueError("User must have a name")
        
        REQUIRED_FIELDS = ['name']
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)
        
        user.set_password(password)
        user.save()
        
        return user
    def create_superuser(self, email, name, password):
        user = self.create_user(email, name, password)

    
        user.is_superuser = True
        user.is_staff = True
        

        user.save()
        
        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)


    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    
    def get_full_name(self):
        return self.name
    def get_short_name(self):
        return self.name
    def __str__(self):
        return self.email

def event_thumbnail_path(instance, filename):
    # Generate a slug from the event name
    event_name_slug = slugify(instance.name)
    
    # Get the file extension from the original filename
    _, ext = os.path.splitext(filename)
    
    # Construct the new filename using the event name slug and file extension
    new_filename = f"thumbnails/{event_name_slug}{ext}"
    
    return new_filename


class EventImage(models.Model):
    event = models.ForeignKey('Event', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='')

    def upload_to_path(instance, filename):
        return os.path.join('img', instance.event.link, filename)

    image.upload_to = upload_to_path

    def __str__(self):
        return f"Image for {self.event.name}"


class Event(models.Model):
    name = models.CharField(max_length=1000)
    description = models.TextField()
    link = models.CharField(max_length=100, unique=True)
    date = models.DateTimeField()
    location = models.CharField(max_length=500)
    city = models.CharField(max_length=50)
    capacity = models.IntegerField()
    isPrivate = models.BooleanField(default=False)
    pkey = models.CharField(max_length=32, blank=True)
    hasFee = models.BooleanField(default=True)
    entryFee = models.IntegerField(null=True, blank=True)
    host = models.CharField(max_length=500)
    tags = models.CharField(max_length=500, null=True, blank=True)
    # thumb = models.ImageField(upload_to='thumbnail/', null=True, blank=True)
    thumb = models.ImageField(upload_to=event_thumbnail_path, null=True, blank=True)
    # isCompleted = models.BooleanField(default=False)
    # images = models.ManyToManyField(EventImage, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    @property
    def isCompleted(self):
        if timezone.now() > self.date:
            return True
        return False


    def clean(self):
        if self.isPrivate and not self.pkey:
            raise ValidationError({'pkey': 'pkey is required when isPrivate is selected'})

        if self.hasFee and self.entryFee is None:
            raise ValidationError({'entry_fee': 'entry_fee is required when hasFee is selected'})

    def save(self, *args, **kwargs):
        self.full_clean()
        super(Event, self).save(*args, **kwargs)

    
    def __str__(self):
        return self.name

@receiver(post_save, sender=Event)
def create_event_folder(sender, instance, created, **kwargs):
    if created:
        folder_path = os.path.join('static', 'images', 'img', instance.link)
        os.makedirs(folder_path, exist_ok=True)

class EventSpeaker(models.Model):
    event = models.ForeignKey('Event', on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True, blank=True)
    dp = models.ImageField(upload_to='')

    def upload_to_path(instance, filename):
        return os.path.join('img', instance.event.link, 'speakers', filename)

    dp.upload_to = upload_to_path

    def __str__(self):
        return f"Speakers for {self.event.name}"

class Userprofile(models.Model):
    user = models.OneToOneField(UserAccount,primary_key=True,verbose_name='user',related_name='profile',on_delete= models.CASCADE)
    phone = models.CharField(max_length=11,null=True,blank=True)
    email = models.CharField(max_length=50,null=True,blank=True)
    avatar = models.ImageField(upload_to='avatar/')

    def __str__(self):
        return self.user.name

class RegisteredEvent(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.name} - {self.event.name} - Registered"


class InterestedEvent(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.name} - {self.event.name} - Interested"
