from django.shortcuts import render
# from .forms import SeedForm
from django.contrib.auth.models import User, Group
from .models import SharedList
# from django.core.urlresolvers import reverse
import time
# from django.contrib import messages
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
    print("printing friendsList")
    print(user.profile.friendsList)
    print("printed friendsList")
    allowed_torrents=user.allowed_users.all();
    friendsTorrent={}
    othersTorrent=user.allowed_users.all();
    #for torrent in user.allowed_users.all():

    for friendEmail in json.loads(user.profile.friendsList):
        friend=User.objects.get(email=friendEmail)
        allMagnetLinks=allowed_torrents.filter(seeders=friend);
        friendsTorrent[friend.email]=allMagnetLinks;
        othersTorrent= othersTorrent.exclude(seeders=friend)

    return render(request, 'display.html',
                  {'name': username,'friendsTorrent':friendsTorrent,'torrentsFromSelf':user.seeders.all(),'torrentsFromOther': othersTorrent})


def download(request):
    username = None
    if request.user.is_authenticated():
        username = request.user.username
    user=User.objects.get(username=username);
    #user.profile.friendsList='["pabhi@iitk.ac.in"]'
    print("printing friendsList")
    print(user.profile.friendsList)
    print("printed friendsList")
    #torrentFromFriends={"name":}
    #for friend in json.loads(user.profile.friendsList):
    allowed_torrents=user.allowed_users.all();
    friendsTorrent={}
    othersTorrent=user.allowed_users.all();
    #for torrent in user.allowed_users.all():

    for friendEmail in json.loads(user.profile.friendsList):
        friend=User.objects.get(email=friendEmail)
        allMagnetLinks=allowed_torrents.filter(seeders=friend);
        friendsTorrent[friend.email]=allMagnetLinks;
        othersTorrent= othersTorrent.exclude(seeders=friend)

    return render(request, 'downloadmagnet.html',
                  {'name': username,'friendsTorrent':friendsTorrent,'torrentsFromSelf':user.seeders.all(),'torrentsFromOther': othersTorrent})


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
            print(" in try block")
            rec=SharedList.objects.get(magnet_link=magnet_link);
        except SharedList.DoesNotExist:
            rec = SharedList(magnet_link=magnet_link,
                             start_time=start_time)
            rec.save()
            print(rec.magnet_link," exception  printed torrent")


        user = None

        try:
            user=User.objects.get(username=username);
            print(user, type(user),"in try of las")
            rec.seeders.add(user)
            rec.save()
        except User.DoesNotExist:
            print ("user doesn't exist in exception of username")


        for email in friendsList:
            try:
                user_temp=User.objects.get(email=email);
                if(user_temp.username==username):
                    continue;
                print(user_temp,"in try ")
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
                print(user, type(user),"in try ")
                rec.allowed_users.add(user)
                print(rec.allowed_users.all())
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
                rec.last_active_time=time.time()
            except User.DoesNotExist:
                print ("user doesn't exist in exception of username /update")

        return render(request, 'seed.html', {'name': username})
