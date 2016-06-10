from django.views import generic

class IndexView(generic.base.TemplateView):
    template_name = 'ongames/index.html'
