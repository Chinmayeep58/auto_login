from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
from pymongo import MongoClient

client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["jobPortal"]
collection = db["users"]

user = collection.find_one()

if not user:
    print("No user found in the database! Add a user first.")
    exit()

email = user["email"]
password = user["password"]

driver = webdriver.Chrome()
driver.maximize_window()

try:
    driver.get("http://127.0.0.1:5500/frontend/login.html")
    time.sleep(3)  
    driver.find_element(By.ID, "email").send_keys(email)
    driver.find_element(By.ID, "password").send_keys(password)

    driver.find_element(By.TAG_NAME, "button").click()
    time.sleep(5)  

    print("Login automation successful!")

except Exception as e:
    print("Automation failed:", str(e))

finally:
    time.sleep(5)  
    driver.quit()
