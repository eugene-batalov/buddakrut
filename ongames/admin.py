from django.contrib import admin
from . import models


@admin.register(models.Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = ('idstory', 'parts', 'closed', 'rating', 'name', 'creator', 'nextusertype', 'nextuser', 'waittime', 'maxparts', 'deadline', 'started')
    list_editable = ('idstory', 'parts', 'closed', 'rating', 'name', 'creator', 'nextusertype', 'nextuser', 'waittime', 'maxparts', 'deadline', 'started')
    
    def changelist_view(self, request, extra_context=None):
        extra_context = {'title': 'Stories'}
        return super(StoryAdmin, self).changelist_view(request, extra_context=extra_context)

@admin.register(models.Storyparts)
class StorypartsAdmin(admin.ModelAdmin):
    list_display = ('idstoryparts', 'text1', 'text2', 'user', 'number', 'rating', 'created')
    list_editable = ('idstoryparts', 'text1', 'text2', 'user', 'number', 'rating', 'created')


@admin.register(models.Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ('idusers', 'name', 'email', 'karma', 'paidtill', 'isPaid')
    list_editable = ('idusers', 'name', 'email', 'karma', 'paidtill')
    