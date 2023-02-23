#!/usr/bin/env python

import asyncio
import websockets
import pyscreenshot
import time
from PIL import ImageFont, ImageDraw, Image

def savescreen(fn,counter,degrees):
    # screenshot = pyscreenshot.grab(bbox=(0,0,1920,1024)) # left monitor
    screenshot = pyscreenshot.grab(bbox=(1921,0,3840,1024)) # right monitor
    fn = rf'shots/{fn}'
    screenshot.save(fn)
    img =  Image.open(fn)
    I1 = ImageDraw.Draw(img)
    font = ImageFont.truetype("arial.ttf", 34)
    I1.text((10, 10), f"c{counter} d{degrees}", fill=(0, 255, 255),font=font)
    img.save(fn)
    img.close()

async def handler(websocket):
    while True:
        message = await websocket.recv()
        if message.find("saveScreen") != -1:
            dat = message.split(":")
            # print(dat)
            counter = dat[1]
            degrees = dat[2]
            epoch_time = int(time.time())
            fn = f"{counter}_{degrees}_{epoch_time}.png"
            print(f"Saving Srceen to {fn}...")
            savescreen(fn,counter,degrees)


async def main():
    async with websockets.serve(handler, "", 8000):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())

