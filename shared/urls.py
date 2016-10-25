from django.conf.urls import url
from . import views

app_name='shared'

urlpatterns =[
    url(r'^seed$', views.seed, name='seed'),
    url(r'^download$', views.download, name='download'),
    url(r'^postdata$', views.postdata, name='postdata')
    
]
