from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import auth
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render, render_to_response, redirect
from django.core.urlresolvers import reverse
from django.core.context_processors import csrf
from django.views import generic
from .models import Users
from django.template import RequestContext, loader


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
    c = {}
    c.update(csrf(request))
    request.session['next'] = request.GET.get('next', '/')
    return render_to_response('ongames/login.html', c)
#    template = loader.get_template('ongames/login.html')
#    context = RequestContext(request, )
#    return HttpResponse(template.render(context))
        
def auth_view(request):
    username = request.POST.get('username', '')
    password = request.POST.get('password', '')
    redirect_to = request.session['next']
    user = auth.authenticate(username=username, password=password)
    if user is not None:
        auth.login(request, user)
        return HttpResponseRedirect(redirect_to)
    else:
        return redirect('/login/')
    
    