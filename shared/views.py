from django.shortcuts import render

def seed(request):
    return render(request,'seed.html')

def download(request):
    return render(request,'downloadmagnet.html')
def postdata(request):
    print(request)
    return render(request,'seed.html')
