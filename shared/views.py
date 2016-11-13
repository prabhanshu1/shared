from django.shortcuts import render
from django.contrib.auth.models import User, Group
from .models import SharedList
import time
import json

def seed(request):
    username = None
    if request.user.is_authenticated():
        username = request.user.username
    return render(request, 'seed.html')

def display(request):
    username = None
    if request.user.is_authenticated():
        username = request.user.username

    user=User.objects.get(username=username);
    allowed_torrents=user.allowed_users.all();
    friendsTorrent={}
    othersTorrent=user.allowed_users.all();

    for friendEmail in json.loads(user.profile.friendsList):
        friend=User.objects.get(email=friendEmail)
        allMagnetLinks=allowed_torrents.filter(seeders=friend);
        friendsTorrent[friend.email]=allMagnetLinks;
        othersTorrent= othersTorrent.exclude(seeders=friend)

    return render(request, 'display.html',
                  {'friendsTorrent':friendsTorrent,'torrentsFromSelf':user.seeders.all(),'torrentsFromOther': othersTorrent})


def download(request):
    username = None
    if request.user.is_authenticated():
        username = request.user.username
    user=User.objects.get(username=username);
    allowed_torrents=user.allowed_users.all();
    friendsTorrent={}
    othersTorrent=user.allowed_users.all();

    for friendEmail in json.loads(user.profile.friendsList):
        friend=User.objects.get(email=friendEmail)
        allMagnetLinks=allowed_torrents.filter(seeders=friend);
        friendsTorrent[friend.email]=allMagnetLinks;
        othersTorrent= othersTorrent.exclude(seeders=friend)

    return render(request, 'downloadmagnet.html',
                  {'friendsTorrent':friendsTorrent,'torrentsFromSelf':user.seeders.all(),'torrentsFromOther': othersTorrent})


def postdata(request):
    print(request)
    if request.method == 'POST':
        magnet_link = request.POST['magnetURI']
        emailList = request.POST.getlist('emailList[]')
        friendsList=request.POST.getlist('friendsList[]')

        username = None
        if request.user.is_authenticated():
            username = request.user.username
        start_time = int(time.time())

        try:
            rec=SharedList.objects.get(magnet_link=magnet_link);
        except SharedList.DoesNotExist:
            rec = SharedList(magnet_link=magnet_link,
                             start_time=start_time)
            rec.save()

        user = None

        try:
            user=User.objects.get(username=username);
            rec.seeders.add(user)
            rec.save()
        except User.DoesNotExist:
            print ("user doesn't exist in exception of username")


        for email in friendsList:
            try:
                user_temp=User.objects.get(email=email);
                if(user_temp.username==username):
                    continue;
                friendsList=json.loads(user.profile.friendsList)
                if email not in friendsList:
                    friendsList.append(email);
                    user.profile.friendsList=json.dumps(friendsList)
                    user.save()
            except User.DoesNotExist:
                print ("user doesn't exist in exception loop")


        for email in emailList:
            try:
                user=User.objects.get(email=email);
                if(user.username==username):
                    continue;
                rec.allowed_users.add(user)
                rec.save()
            except User.DoesNotExist:
                print ("user doesn't exist in exception loop")
        return render(request, 'downloadmagnet.html')


def updatedata(request):
    if request.method == 'POST':
        torrentList = request.POST.getlist('torrent[]')
        username = None
        if request.user.is_authenticated():
            username = request.user.username

        for torrent in torrentList:
            try:
                rec=SharedList.objects.get(magnet_link=torrent);
            except SharedList.DoesNotExist:
                rec=SharedList(magnet_link=torrent)
                rec.save()
                print(rec.magnet_link," exception  printed torrent")

            try:
                user=User.objects.get(username=username);
                rec.seeders.add(user)
                rec.last_active_time=time.time()
            except User.DoesNotExist:
                print ("user doesn't exist in exception of username /update")

        return render(request, 'seed.html', {'name': username})
