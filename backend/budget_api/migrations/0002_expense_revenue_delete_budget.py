# Generated by Django 5.0.1 on 2024-01-26 00:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budget_api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('value', models.IntegerField()),
                ('date', models.DateField()),
                ('description', models.TextField(max_length=250)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Revenue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('value', models.IntegerField()),
                ('date', models.DateField()),
                ('description', models.TextField(max_length=250)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.DeleteModel(
            name='Budget',
        ),
    ]
