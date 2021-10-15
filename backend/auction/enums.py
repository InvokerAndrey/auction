import enum


class AuctionType(enum.Enum):
    ENGLISH = 'ENGLISH'
    DUTCH = 'DUTCH'

    @classmethod
    def choices(cls):
        return tuple((type.name, type.value) for type in cls)


class AuctionStatus(enum.Enum):
    PENDING = 'PENDING'
    IN_PROGRESS = 'IN_PROGRESS'
    CLOSED = 'CLOSED'

    @classmethod
    def choices(cls):
        return tuple((status.name, status.value) for status in cls)
