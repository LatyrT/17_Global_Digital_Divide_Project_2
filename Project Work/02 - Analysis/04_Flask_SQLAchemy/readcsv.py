import json
import pandas as pd
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy import Column, Integer, String, Float



from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()




from flask import Flask, jsonify

url = 'postgresql://{user}:{pw}@{url}/{db}'.format(user="postgres",pw="postgres",url="localhost",db="Internet_DB")





class Country_Data(Base):
  __tablename__ = "country"
  index = Column(Integer, primary_key=True)
  countries = Column(String)
  internet_users = Column(String)
  penetration = Column(String)
  population = Column(String)
  region = Column(String)
  longitude = Column(String)
  latitude = Column(String)


class webindex(Base):
  __tablename__ = "wi"
  index = Column(Integer, primary_key=True)
  countries = Column(String)
  overall_score = Column(sqlalchemy.types.Float)
  longitude = Column(sqlalchemy.types.Float)
  latitude = Column(sqlalchemy.types.Float)
  universal_access = Column(sqlalchemy.types.Float)
  freedom_openness = Column(sqlalchemy.types.Float)
  relevant_content = Column(sqlalchemy.types.Float)
  empowerment = Column(sqlalchemy.types.Float)
  
class World_Internet(Base):
  __tablename__ = "world"
  index = Column(Integer, primary_key=True)
  world_regions = Column(String)
  population = Column(String)
  pop = Column(String)
  internet_users = Column(String)
  penetration_rate = Column(String)
  growth = Column(String)
  internet_world = Column(String)

class Cost_Speed(Base):
  __tablename__ = "cost_speed"
  index = Column(Integer, primary_key=True)
  countries = Column(String)
  avg_monthly_cost_in_gbp = Column(sqlalchemy.types.Float)
  avg_download_speed_mbps = Column(sqlalchemy.types.Float)
  avg_upload_speed_mbps = Column(sqlalchemy.types.Float)

 

engine = create_engine(url)
Base.metadata.create_all(engine)



# Flask Setup
#################################################
app = Flask(__name__)

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/InternetByCountry<br/>"
        f"/api/v1.0/WebIndex1<br/>"
        f"/api/v1.0/WebIndex2<br/>"
        f"/api/v1.0/WorldInternet<br/>"
        f"/api/v1.0/CostandSpeed<br/>"
    )


@app.route("/api/v1.0/InternetByCountry")
#Convert the query results to a dictionary using `date` as the key and `prcp` as the value.
def name():
    #Query result
    session = Session(bind=engine)
    Country_list=session.query(Country_Data.countries,Country_Data.internet_users,Country_Data.penetration,Country_Data.population,Country_Data.region,Country_Data.longitude,Country_Data.latitude).all()
    session.close()
    print(Country_Data)
    print(Country_list)
    #Create list containing information
    country_dict=[]
    for i in range(len( Country_list)):
        percentage=Country_list[i][2][0:len(Country_list[i][2])-2]
        country_dict.append({
            "Country": Country_list[i][0],
            "InternetUsers":int(Country_list[i][1]),
            "Percent_Population":int(round(float(percentage),0)),
            "Population":int(Country_list[i][3]),
            "Region":Country_list[i][4],
            "Location":[Country_list[i][6],Country_list[i][5]]
        })
    #Return the JSON representation of your dictionary.
    return jsonify(country_dict)


@app.route("/api/v1.0/WebIndex1")
def internet_index1():
    #Query result
    session = Session(bind=engine)
    web_index_list1=session.query(webindex.countries,webindex.overall_score,webindex.longitude,webindex.latitude,webindex.universal_access,webindex.freedom_openness,webindex.relevant_content,webindex.empowerment).all()
    session.close()
    print(webindex)
    print(web_index_list1)
    #Create list containing information
    web_index_dict1=[]
    for i in range(len(web_index_list1)):
        web_index_dict1.append({
            "Countries": web_index_list1[i][0],
            "Latitude":float(web_index_list1[i][3]),
            "Longitude":float(web_index_list1[i][2]),
            "Overall score":web_index_list1[i][1],
            "Universal Access":web_index_list1[i][4],
            "Freedoms & Openness":web_index_list1[i][5],
            "Relevant Content":web_index_list1[i][6],
            "Empowerment":web_index_list1[i][7]
        })
    #Return the JSON representation of your dictionary.
    return jsonify(web_index_dict1)


@app.route("/api/v1.0/WebIndex2")
def internet_index2():
    #Query result
    session = Session(bind=engine)
    web_index_list2=session.query(webindex.countries,webindex.overall_score,webindex.longitude,webindex.latitude,webindex.universal_access,webindex.freedom_openness,webindex.relevant_content,webindex.empowerment).all()
    session.close()
    print(webindex)
    print(web_index_list2)
    #Create list containing information
    web_index_dict2=[]
    for i in range(len(web_index_list2)):
        web_index_dict2.append({
            "countries": web_index_list2[i][0],
            "overalls":web_index_list2[i][1],
            "universals":web_index_list2[i][4],
            "freedoms":web_index_list2[i][5],
            "relevant_content":web_index_list2[i][6],
            "empowerment":web_index_list2[i][7],
            "location":[float(web_index_list2[i][3]),float(web_index_list2[i][2])]
        })
    #Return the JSON representation of your dictionary.
    return jsonify(web_index_dict2)

@app.route("/api/v1.0/WorldInternet")
def world_internet():
    #Query result
    session = Session(bind=engine)
    wrold_internet_stats=session.query(World_Internet.world_regions,World_Internet.population,World_Internet.pop,World_Internet.internet_users,World_Internet.penetration_rate,World_Internet.growth,World_Internet.internet_world).all()
    session.close()
    print(World_Internet)
    print(wrold_internet_stats)
    #Create list containing information
    world_web_dict=[]
    for i in range(len(wrold_internet_stats)-1):
        Growth=wrold_internet_stats[i][5][0:len(wrold_internet_stats[i][5])-2]
        print(Growth)
        Growth1=Growth.split(",")
        print(Growth.split(","))
        Growth2=''.join(Growth1)
        print(Growth2)
        world_web_dict.append({
            "World_Regions": wrold_internet_stats[i][0],
            "Population":wrold_internet_stats[i][1],
            "Population_Perc_of_World":float(wrold_internet_stats[i][2][0:len(wrold_internet_stats[i][2])-2])/100,
            "Internet_Users":wrold_internet_stats[i][3],
            "Penetration_Rate":float(wrold_internet_stats[i][4][0:len(wrold_internet_stats[i][4])-2])/100,
            "Growth_2000_2020":float(Growth2)/100,
            "Internet_World_Perc":float(wrold_internet_stats[i][6][0:len(wrold_internet_stats[i][6])-2])/100
        })
    #Return the JSON representation of your dictionary.
    return  jsonify(world_web_dict)


@app.route("/api/v1.0/CostandSpeed")
def costAndspeed():
    #Query result
    session = Session(bind=engine)
    cost_speed_stats=session.query(Cost_Speed.countries,Cost_Speed.avg_monthly_cost_in_gbp,Cost_Speed.avg_download_speed_mbps).all()
    session.close()
    print(Cost_Speed)
    print(cost_speed_stats)
    #Create list containing information
    cost_speed_dict=[]
    for i in range(len(cost_speed_stats)):
        cost_speed_dict.append({
            "country": cost_speed_stats[i][0],
            "cost":cost_speed_stats[i][1],
            "dlspeed":cost_speed_stats[i][2]
        })
    #Return the JSON representation of your dictionary.
    return  jsonify(cost_speed_dict)


if __name__ == "__main__":
    app.run(debug=True)

