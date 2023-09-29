#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from models.models import *
from config import app, db

# Remote library imports
from faker import Faker

# if __name__ == '__main__':
#     fake = Faker()
with app.app_context():
    print("Starting seed...")


    herbs = []

    h1 = Herb(name= "Acai",latin_name= "Euterpe oleracea",description= "Like other berries, açar berries are loaded with antioxidants that help to protect cells from damage that may lead to chronic diseases such as heart disease, diabetes, and cancer. Açaí berry contains vitamin A, fiber, calcium, iron, essential fatty acids (omega-9), anthocyanins (antioxidant), and polysterols. The Journal of Agricultural and Food Chemistry published a 2008 study showing that the açai berry has more antioxidants than blackberries, blueberries, strawberries, and raspberries, but fewer antioxidants than red wine and pomegranate juice.",warnings= "No known warnings",image_url= "https=//www.cleanjuice.com/wp-content/uploads/2022/06/Acai-Berries-1080x675.jpeg")

    herbs.append(h1)

    h2 = Herb(id= 2,name= "Agrimony",latin_name= "Agrimonia eupatoria",description= "Agrimony is an astringent that helps stop urinary bleeding and diarrhea. It's helpful for those with cloudy, smelly urine and for those with incontinence. It also has an energetic action on the nervous system and helps to relieve emotional tension. Its indication as a flower remedy is a good guide to its herbal use it helps people who mask their pain behind a facade of cheerfulness. It's helpful for people who have a tense pulse and appear friendly and cheerful, but are actually very tense and stressed. It is a great urinary tract remedy and helps urinary tract infections and cystitis. It also helps constricted liver chi, a pattern in traditional Chinese medicine that is commonly seen in many Americans. This involves an inner resistance, anger, or frustration that constricts blood flow to the liver and creates a tense, wiry pulse. Agrimony relaxes blood flow to the liver and helps a person relax and go with the flow of life.",warnings= "No known warnings",image_url= "https=//www.gardeningknowhow.com/wp-content/uploads/2017/03/agrimony-.jpg")

    herbs.append(h2)

    db.session.add_all(herbs)
    db.session.commit()




