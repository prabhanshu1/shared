from django.conf.urls import url
from . import views

app_name='shared'

urlpatterns =[
    url(r'^seed$', views.seed, name='seed'),
    url(r'^display$', views.display, name='display'),
    url(r'^download$', views.download, name='download'),
    url(r'^postdata$', views.postdata, name='postdata'),
    url(r'^updatedata$', views.updatedata, name='updatedata'),
    url(r'^$', views.seed, name='seed')
]
