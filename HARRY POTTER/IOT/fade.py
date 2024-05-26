
from machine import Pin, PWM
import time

pwm_led = PWM(Pin(13,mode=Pin.OUT)) # on prescise au programme que la pin 15 est une sortie de type PWN

while True:
    
    for cycle in range(0, 10000, 100): 
        pwm_led.duty_u16(cycle) 
        time.sleep_ms(10) 

  
    for cycle in range(10000, -1, -100):
        pwm_led.duty_u16(cycle) 
        time.sleep_ms(10) 
