from django.db import models
import time
# Create your models here.
class SharedList(models.Model):
        magnet_link = models.CharField(max_length=300)
        start_time = models.IntegerField(
                default=time.time(), blank=True)
        seeder = models.CharField(max_length=100,blank=True)

        def __str__(self):              # __unicode__ on Python 2
                return self.magnet_link
        
