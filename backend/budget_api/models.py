from django.db import models
from users.models import User

# Create your models here.
class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=120)
    value = models.IntegerField()
    date = models.DateField()
    description = models.TextField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)
    expense = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Budget'
        verbose_name_plural = 'Budgets'

    def __str__(self) -> str:
        return f"{self.user.username} - {self.name}"

