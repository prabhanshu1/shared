from django.shortcuts import render
# from .forms import SeedForm 
from django.core.urlresolvers import reverse


def seed(request):
    return render(request,'seed.html')

def download(request):
    return render(request,'downloadmagnet.html')
def postdata(request):
    print(request)
    return render(request,'seed.html')

def seeddata(request):
	if request.method == 'POST':
		magnet_link = request.POST['magnetURI']
		original_seeder = request.POST['name']
		start_time = datetime.now
		rec = Share_List(magnet_link = magnet_link, original_seeder = original_seeder, start_time= start_time)
		print (rec)
		rec.save()