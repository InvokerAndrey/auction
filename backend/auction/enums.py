import enum


class BaseEnum(enum.Enum):
    @classmethod
    def choices(cls):
        return tuple((type.value, type.name) for type in cls)


class AuctionTypeEnum(BaseEnum):
    ENGLISH = 1
    DUTCH = 2


class AuctionStatusEnum(BaseEnum):
    PENDING = 1
    IN_PROGRESS = 2
    CLOSED = 3
