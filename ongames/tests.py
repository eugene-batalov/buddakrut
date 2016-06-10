from django.test import TestCase
import datetime
from django.utils import timezone

from .models import Users

class UsersMethodTests(TestCase):
    
    def test_is_paid_works_ok(self):
        time_future = timezone.now() + datetime.timedelta(days=30)
        time_past = timezone.now() - datetime.timedelta(days=30)
        user_no_date = Users(paidtill=None)
        user_date_future = Users(paidtill=time_future)
        user_date_past = Users(paidtill=time_past)
        self.assertEqual(user_date_future.isPaid(), True)
        self.assertEqual(user_no_date.isPaid(), False)
        self.assertEqual(user_date_past.isPaid(), False)