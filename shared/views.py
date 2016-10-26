from django.shortcuts import render
# from .forms import SeedForm 
from .models import SharedList
from django.core.urlresolvers import reverse
import time
from django.contrib import messages

def seed(request):
    return render(request,'seed.html')

def download(request):
    return render(request,'downloadmagnet.html',{'torrentURI': SharedList.objects.all()})

def postdata(request):
    print(request)
    if request.method == 'POST':
        magnet_link = request.POST['magnetURI']
        original_seeder = request.POST['name']
        start_time = int(time.time())
        rec = SharedList(magnet_link = magnet_link, original_seeder = original_seeder, start_time= start_time)
        rec.save()
        return render(request,'downloadmagnet.html')
