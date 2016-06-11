# -*- coding: utf-8 -*-
from django import forms


class LoginForm(forms.Form):
    username = forms.CharField(max_length=100)
    password = forms.CharField(widget=forms.PasswordInput())
#    class Meta:
#        password = forms.CharField(widget=forms.PasswordInput)
#        model = User
#        widgets = {
#            'password': forms.PasswordInput(),
#        }