from django.db import models
from django.contrib.auth.models import User
import time
from django.db.models.signals import post_save
from django.dispatch import receiver

class SharedList(models.Model):
        magnet_link = models.CharField(max_length=300)
        last_active_time = models.IntegerField(
                default=time.time(), blank=True)
        seeders = models.ManyToManyField(User,related_name="seeders")
        allowed_users = models.ManyToManyField(User,related_name="allowed_users")

        def __str__(self):              # __unicode__ on Python 2
                return self.magnet_link


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friendsList = models.TextField(blank=True,default='[]')


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
