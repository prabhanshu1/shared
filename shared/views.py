from django.shortcuts import render
# from .forms import SeedForm
from .models import SharedList
# from django.core.urlresolvers import reverse
import time
# from django.contrib import messages


def seed(request):
    username = None
    if request.user.is_authenticated():
        username = request.user.username
    return render(request, 'seed.html', {'name': username})


def download(request):
    username = None
    if request.user.is_authenticated():
        username = request.user.username
    return render(request, 'downloadmagnet.html',
                  {'name': username, 'torrentURI': SharedList.objects.all()})


def postdata(request):
    print(request)
    if request.method == 'POST':
        magnet_link = request.POST['magnetURI']
        username = None
        if request.user.is_authenticated():
            username = request.user.username
        start_time = int(time.time())
        rec = SharedList(magnet_link=magnet_link,
                         seeder=username,
                         start_time=start_time)
        rec.save()
        return render(request, 'downloadmagnet.html')


def updatedata(request):
    if request.method == 'POST':
        # original_seeder = request.POST['name']
        torrentList = request.POST.getlist('torrent[]')
        username = None
        if request.user.is_authenticated():
            username = request.user.username
        for torrent in torrentList:
            try:
                print(" in try block")
                magnet_link=SharedList.objects.get(magnet_link=torrent);
            except SharedList.DoesNotExist:
                magnet_link=SharedList(magnet_link=torrent, seeder=username)
                magnet_link.save()
                print(magnet_link.magnet_link," exception  printed torrent")
        username = None
        if request.user.is_authenticated():
            username = request.user.username
        return render(request, 'seed.html', {'name': username})
