# -*- coding: utf-8 -*-

from django.conf.urls import url

from . import views

app_name = 'ongames'

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^(?P<pk>[0-9]+)/$', views.DetailView.as_view(), name='detail'),
    url(r'^(?P<idusers>[0-9]+)/save/$', views.save, name='save'),
    url(r'^login/$', views.login, name='login'),
]