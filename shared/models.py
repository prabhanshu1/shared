from django.db import models

# Create your models here.
class Seed(models.Model):
	magnet_link = models.CharField(max_length=300)
    start_time = models.DateTimeField(
            default=datetime.now, blank=True)
    orignal_seeder = models.CharField(max_length=100)