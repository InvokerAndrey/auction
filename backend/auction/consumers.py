from channels.generic.websocket import AsyncJsonWebsocketConsumer


class AuctionConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        print('connecting...')
        # Join room group
        await self.channel_layer.group_add(
            'auctions',
            self.channel_name,
        )
        await self.accept()

    async def disconnect(self, close_code):
        print('disconnecting...')
        # Leave room group
        await self.channel_layer.group_discard(
            'auctions',
            self.channel_name
        )
        await self.close()

    async def auctions_alarm(self, auction):
        print('In auctions_alarm')
        await self.send_json(
            {
                'type': 'auctions.alarm',
                'content': auction['content']
            }
        )
        print('SENT In auctions_alarm')
