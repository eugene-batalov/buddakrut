# -*- coding: utf-8 -*-

from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import auth
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render, render_to_response, redirect
from django.core.urlresolvers import reverse
from django.views import generic
from django.template import RequestContext, loader
from django.core.mail import send_mail

from .models import Users
from .forms import LoginForm

class IndexView(generic.ListView):
    template_name = 'ongames/index.html'
    context_object_name = 'latest_users_list'

    def get_queryset(self):
        """Return the last five users."""
        return Users.objects.order_by('-idusers')[:5]


class DetailView(LoginRequiredMixin, generic.DetailView):
    login_url = '/login/'
    model = Users
    template_name = 'ongames/details.html'
    context_object_name = 'user'
    
def save(request, idusers):
    user = Users.objects.get(pk=idusers)
    name = request.POST['name']
    if len(name) < 2:
        # Redisplay the question voting form.
        return render(request, 'ongames/details.html', {
            'user': user,
            'error_message': "Name should contain as least two letters.",
        })
    else:
        user.name = name
        user.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('ongames:detail', args=(user.idusers,)))

def login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
                user = auth.authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
                if user is not None:
                    auth.login(request, user)
                    return HttpResponseRedirect(request.session['next'])
                else:
                    return redirect('/login/')
    else:
        form = LoginForm()
    c = {}
    c['form'] = form
    request.session['next'] = request.GET.get('next', '/')
    return render(request, 'ongames/login.html', c)
    
# Send Mail:
#if form.is_valid():
#    subject = form.cleaned_data['subject']
#    message = form.cleaned_data['message']
#    sender = form.cleaned_data['sender']
#    cc_myself = form.cleaned_data['cc_myself']
#
#    recipients = ['info@example.com']
#    if cc_myself:
#        recipients.append(sender)
#
#    send_mail(subject, message, sender, recipients)
#    return HttpResponseRedirect('/thanks/')
   
    