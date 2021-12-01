from rest_framework import serializers

from .models import Item


class ItemSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField(read_only=True)

    def get_photo(self, obj):
        return 'https://res.cloudinary.com/hicl18kdd/' + str(obj.photo)

    class Meta:
        model = Item
        fields = ['id', 'photo', 'title', 'description']