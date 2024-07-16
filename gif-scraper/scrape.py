import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver

from selenium.webdriver import ChromeOptions

options = ChromeOptions()
options.add_argument("--headless=new")
driver = webdriver.Chrome(options=options)

url = "https://www.pokencyclopedia.info/en/index.php?id=sprites/gen5/ani_black-white"

driver = webdriver.Chrome()
driver.get(url)
results = []
content = driver.page_source
soup = BeautifulSoup(content, "html.parser")

table = soup.find(attrs={'id':'spr_dump'})
for a in table:
    img = a.find("img")
    if img != -1:
       print(img["src"])

print(results)
