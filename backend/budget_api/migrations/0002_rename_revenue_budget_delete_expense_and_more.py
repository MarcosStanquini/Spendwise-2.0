# Generated by Django 5.0.1 on 2024-01-26 20:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('budget_api', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Revenue',
            new_name='Budget',
        ),
        migrations.DeleteModel(
            name='Expense',
        ),
        migrations.AlterModelOptions(
            name='budget',
            options={'verbose_name': 'Budget', 'verbose_name_plural': 'Budgets'},
        ),
    ]
