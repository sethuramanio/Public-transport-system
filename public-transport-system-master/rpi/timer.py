# Program to demonstrate 
# timer objects in python 
  
import threading 
def gfg(): 
    print("Hello\n") 
  
timer = threading.Timer(2.0, gfg) 
timer.start() 
#print("Exit\n")