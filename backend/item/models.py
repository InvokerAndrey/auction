from django.db import models


class Item(models.Model):
    photo = models.ImageField(
        null=True, blank=True,
        default='/placeholder.jpg'
    )
    title = models.CharField(
        max_length=255,
        null=True,
        blank=True
    )
    description = models.TextField(
        null=True,
        blank=True
    )

    def __str__(self):
        return self.title
