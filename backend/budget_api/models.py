from django.db import models

# Create your models here.
class Budget(models.Model):
    name = models.CharField(max_length=120)
    value = models.IntegerField()
    date = models.DateField()
    description = models.TextField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        abstract = True


class Revenue(Budget):
    pass

class Expense(Budget):
    pass

