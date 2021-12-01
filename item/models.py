from django.db import models
from cloudinary.models import CloudinaryField


class Item(models.Model):
    photo = CloudinaryField('image')
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
