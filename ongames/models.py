from django.db import models


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
        db_table = 'story'


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


class Users(models.Model):
    idusers = models.AutoField(primary_key=True)
    name = models.CharField(max_length=45)
    email = models.CharField(max_length=45)
    karma = models.IntegerField()
    paidtill = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'users'