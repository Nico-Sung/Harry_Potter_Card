import network   #import des fonction lier au wifi
import urequests#import des fonction lier au requetes http
import utime#import des fonction lier au temps
import ujson#import des fonction lier aà la convertion en Json
from machine import Pin, PWM
import random
wlan = network.WLAN(network.STA_IF)
wlan.active(True) 

ip = wlan.ifconfig()[0]
print(ip)
ssid = 'Freebox-612566'
password = ''
wlan.connect(ssid, password) 
id_character = ['harry-potter', 'draco-malfoy', 'cedric-diggory', 'luna-lovegood']


maisons = { "Gryffindor": [30000, 5, 5],
            "Slytherin": [5, 30000, 5],
            "Ravenclaw": [5, 5, 30000],
            "Hufflepuff": [30000, 30000, 5]
            }
pwm_ledR = PWM(Pin(13,mode=Pin.OUT)) # on prescise au programme que la pin 15 est une sortie de type PWN
pwm_ledR.freq(1_000)
pwm_ledG = PWM(Pin(14,mode=Pin.OUT)) # on prescise au programme que la pin 15 est une sortie de type PWN
pwm_ledG.freq(1_000)
pwm_ledB = PWM(Pin(15,mode=Pin.OUT)) # on prescise au programme que la pin 15 est une sortie de type PWN
pwm_ledB.freq(1_000)

while not wlan.isconnected():
    print("pas co L")
    utime.sleep(1)
    pass


while(True):
    try:
        random_character = random.choice(id_character)
        print("GET")
        url = "https://hp-api.lainocs.fr/characters/" + random_character
        request = urequests.get(url) 
        print(request.json()["name"]) 
        maison = (request.json()["house"])
        request.close()
        utime.sleep(1)
        pwm_ledR.duty_u16(maisons[maison][0])
        pwm_ledG.duty_u16(maisons[maison][1])
        pwm_ledB.duty_u16(maisons[maison][2])
        request.close() 
    except Exception as e:
        print(e)