# -*- coding: utf-8 -*-

from django.conf.urls import url

from . import views
app_name = 'thirdauth'

urlpatterns = [
    url(r'^$', views.home, name='home'),
]