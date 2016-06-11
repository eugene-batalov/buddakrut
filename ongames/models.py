from django.db import models
from django.utils import timezone

class Story(models.Model):
    idstory = models.AutoField(primary_key=True)
    parts = models.IntegerField()
    closed = models.CharField(max_length=1)
    rating = models.IntegerField()
    name = models.CharField(max_length=45)
    creator = models.ForeignKey('Users', models.DO_NOTHING, db_column='creator')
    nextusertype = models.CharField(max_length=1)
    nextuser = models.CharField(max_length=45, blank=True, null=True)
    waittime = models.IntegerField()
    maxparts = models.IntegerField(blank=True, null=True)
    deadline = models.DateTimeField(blank=True, null=True)
    started = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'storychain'
        verbose_name = 'story'
        verbose_name_plural = 'stories'


class Storyparts(models.Model):
    idstoryparts = models.AutoField(primary_key=True)
    text1 = models.CharField(max_length=100)
    text2 = models.CharField(max_length=100)
    user = models.ForeignKey('Users', models.DO_NOTHING, db_column='user')
    number = models.IntegerField()
    rating = models.IntegerField()
    created = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'storyparts'        
        verbose_name = 'storypart'
        verbose_name_plural = 'storyparts'

class Users(models.Model):
    idusers = models.AutoField(primary_key=True)
    name = models.CharField(max_length=45)
    email = models.CharField(max_length=45)
    karma = models.IntegerField()
    paidtill = models.DateTimeField()

    def __str__(self):
        return 'id: ' + str(self.idusers) + ' name: ' + self.name
    def isPaid(self):
        return self.paidtill is not None and self.paidtill >= timezone.now()    
    
    class Meta:
        managed = False
        db_table = 'users'        
        verbose_name = 'user'
        verbose_name_plural = 'users'
