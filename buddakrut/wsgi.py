"""
WSGI config for buddakrut project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/
"""

import os, sys
sys.path.append(os.path.join(os.path.expanduser('~'), 'domains/buddakrut/buddakrut')
sys.path.append('~/anaconda3/lib/python3.5/site-packages')
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "buddakrut.settings")

application = get_wsgi_application()
