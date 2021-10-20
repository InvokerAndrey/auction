import enum


class BaseEnum(enum.Enum):
    @classmethod
    def choices(cls):
        return tuple((type.name, type.value) for type in cls)


class AuctionTypeEnum(BaseEnum):
    ENGLISH = 'ENGLISH'
    DUTCH = 'DUTCH'


class AuctionStatusEnum(BaseEnum):
    PENDING = 'PENDING'
    IN_PROGRESS = 'IN_PROGRESS'
    CLOSED = 'CLOSED'
