from django.shortcuts import render
# from .forms import SeedForm
from django.contrib.auth.models import User
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
    user=User.objects.get(username=username);
    return render(request, 'downloadmagnet.html',
                  {'name': username,'torrentsFromSelf':user.seeders.all(),'torrentsFromOther': user.allowed_users.all()})


def postdata(request):
    print(request)
    if request.method == 'POST':
        magnet_link = request.POST['magnetURI']
        emailList = request.POST.getlist('emailList[]')

        username = None
        if request.user.is_authenticated():
            username = request.user.username
        start_time = int(time.time())
        try:
            print(" in try block")
            rec=SharedList.objects.get(magnet_link=magnet_link);
        except SharedList.DoesNotExist:
            rec = SharedList(magnet_link=magnet_link,
                             start_time=start_time)
            rec.save()
            print(rec.magnet_link," exception  printed torrent")

        try:
            user=User.objects.get(username=username);
            print(user, type(user),"in try of las")
            rec.seeders.add(user)
        except User.DoesNotExist:
            print ("user doesn't exist in exception of username")


        for email in emailList:
            try:
                user=User.objects.get(email=email);
                if(user.username==username):
                    continue;
                print(user, type(user),"in try ")
                rec.allowed_users.add(user)
            except User.DoesNotExist:
                print ("user doesn't exist in exception loop")
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
                rec=SharedList.objects.get(magnet_link=torrent);
            except SharedList.DoesNotExist:
                rec=SharedList(magnet_link=torrent)
                rec.save()
                print(rec.magnet_link," exception  printed torrent")

            try:
                user=User.objects.get(username=username);
                print(user, type(user),"in try of las /update")
                rec.seeders.add(user)
            except User.DoesNotExist:
                print ("user doesn't exist in exception of username /update")

        return render(request, 'seed.html', {'name': username})
