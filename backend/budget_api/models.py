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
    class Meta:
        verbose_name = 'Revenue'
        verbose_name_plural = 'Revenues'

    def __str__(self) -> str:
        return self.name  
    pass

class Expense(Budget):
      class Meta:
        verbose_name = 'Expense'
        verbose_name_plural = 'Expenses'

      def __str__(self) -> str:
        return self.name  
      
      pass

