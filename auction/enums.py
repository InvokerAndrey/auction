import enum


class BaseEnum(enum.Enum):
    @classmethod
    def choices(cls):
        return tuple((field.value, field.name) for field in cls)

    @classmethod
    def get_name_by_value(cls, value):
        for field in cls:
            if field.value == value:
                return field.name
        return None


class AuctionTypeEnum(BaseEnum):
    ENGLISH = 1
    DUTCH = 2


class AuctionStatusEnum(BaseEnum):
    PENDING = 1
    IN_PROGRESS = 2
    CLOSED = 3
