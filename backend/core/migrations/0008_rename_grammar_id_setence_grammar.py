# Generated by Django 4.2.3 on 2023-08-03 11:39

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0007_setence"),
    ]

    operations = [
        migrations.RenameField(
            model_name="setence",
            old_name="grammar_id",
            new_name="grammar",
        ),
    ]
