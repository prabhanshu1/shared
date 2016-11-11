from django.db import models
from django.contrib.auth.models import User
import time
# Create your models here.
class SharedList(models.Model):
        magnet_link = models.CharField(max_length=300)
        start_time = models.IntegerField(
                default=time.time(), blank=True)
        seeders = models.ManyToManyField(User,related_name="seeders")
        allowed_users = models.ManyToManyField(User,related_name="allowed_user")

        def __str__(self):              # __unicode__ on Python 2
                return self.magnet_link
        
