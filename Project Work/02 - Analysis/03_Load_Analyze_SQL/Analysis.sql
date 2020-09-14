-- Dropiing tables 
Drop table country;
Drop table world;
Drop table wi;
Drop table cost_speed;

-- Creating tables
CREATE TABLE country (	 
	countries VARCHAR (200),
	internet_users INT NOT NULL,
	penetration INT NOT NULL, 
	population INT NOT NULL, 
	region VARCHAR NOT NULL, 
	longitude INT NOT NULL,
	latitude INT NOT NULL
);

ALTER TABLE country 
	alter column countries type VARCHAR,
	alter column internet_users type INT USING internet_users::integer,
	alter column penetration type text USING penetration::TEXT,
	alter column population type INT USING population::integer,
	alter column region type VARCHAR, 
	alter column longitude type INT USING longitude::integer,
	alter column latitude type INT USING latitude::integer;

CREATE TABLE world (
	world_regions VARCHAR NOT NULL,
	population INT NOT NULL,
	pop INT NOT NULL, 
	internet_users INT NOT NULL, 
	penetration_rate INT NOT NULL, 
	growth INT NOT NULL,
	internet_World INT NOT NULL
);

CREATE TABLE wi (
	countries VARCHAR NOT NULL,
	overall_score INT NOT NULL,
	longitude INT NOT NULL,
	latitude INT NOT NULL,
	universal_access INT NOT NULL, 
	freedom_openness INT NOT NULL, 
	relevant_content  INT NOT NULL, 
	empowerment INT NOT NULL,
	internet_World INT NOT NULL
);

ALTER TABLE wi 
	ALTER COLUMN countries TYPE VARCHAR,
	ALTER COLUMN overall_score TYPE INT,
	ALTER COLUMN longitude TYPE INT,
	ALTER COLUMN latitude TYPE INT,
	ALTER COLUMN universal_access TYPE INT, 
	ALTER COLUMN freedom_openness TYPE INT, 
	ALTER COLUMN relevant_content TYPE INT, 
	ALTER COLUMN empowerment TYPE INT;


CREATE TABLE cost_speed (
	countries VARCHAR NOT NULL,
	avg_monthly_cost_in_gbp INT NOT NULL,
	avg_download_speed_mbps INT NOT NULL,
	avg_upload_speed_mbps INT NOT NULL
);

ALTER TABLE cost_speed 
	ALTER COLUMN countries TYPE VARCHAR,
	ALTER COLUMN avg_monthly_cost_in_gbp TYPE INT,
	ALTER COLUMN avg_download_speed_mbps TYPE INT,
	ALTER COLUMN avg_upload_speed_mbps TYPE INT
;


select * from wi;
select * from world;
select * from country;
select * from cost_speed;

-- Selecting top 5 countries with hightest number of Internet Users
select countries, internet_users
From country
Order by internet_users DESC
fetch first 5 rows only;

-- Selecting top 5 countries with hightest no. of Internet Users with higher population
select countries, internet_users, population
From country
Order by population DESC, internet_users DESC 
fetch first 5 rows only;

-- Selecting top 5 countries with lowest number of Internet Users
select countries, internet_users
From country
Order by internet_users ASC
fetch first 5 rows only;

-- countries with highest monthly cost
select countries, avg_monthly_cost_in_gbp
from cost_speed
order by avg_monthly_cost_in_gbp DESC;

-- countries with highest download spped
select countries, avg_download_speed_mbps
from cost_speed
order by avg_download_speed_mbps DESC;

-- countries where download speed is more than upload speed
select countries, avg_upload_speed_mbps, avg_download_speed_mbps
from cost_speed
where avg_download_speed_mbps > avg_upload_speed_mbps;

-- countries where download speed is less than upload speed
select countries, avg_upload_speed_mbps, avg_download_speed_mbps
from cost_speed
where avg_download_speed_mbps < avg_upload_speed_mbps;

-- countries where empoverment index is highest
select countries, empowerment
from wi
order by empowerment DESC
fetch first 5 rows only; 

-- countries where freedom & openness index is highest
select countries,freedom_openness
from wi
order by freedom_openness DESC
fetch first 5 rows only; 

-- countries where content index is highest
select countries,relevant_content, universal_access
from wi
order by freedom_openness DESC
fetch first 5 rows only; 

-- Create combined final tabel 
CREATE TABLE final_table
  AS (SELECT country.countries, country.internet_users, wi.overall_score, wi.universal_access,
	  wi.freedom_openness, wi.relevant_content, wi.empowerment, 
	  cost_speed.avg_monthly_cost_in_gbp, cost_speed.avg_download_speed_mbps, cost_speed.avg_upload_speed_mbps 
      FROM country
      inner join wi on wi.countries=country.countries
	 inner join cost_speed on wi.countries = cost_speed.countries);

select * from final_table;

-- Creating Data Penetration table
CREATE TABLE penetration_table
  AS (SELECT country.countries, country.internet_users,cost_speed.avg_monthly_cost_in_gbp, 
	  cost_speed.avg_download_speed_mbps, cost_speed.avg_upload_speed_mbps, round(internet_users * 100.0 /population,0) AS penetration 
      FROM country
      inner join cost_speed on country.countries = cost_speed.countries);

select * from penetration_table
order by internet_users DESC;

-- Countries with higher universal access score and higher internet users
SELECT country.countries, country.internet_users, cost_speed.avg_monthly_cost_in_gbp, wi.universal_access
	  FROM country
      inner join wi on country.countries = wi.countries
	  inner join cost_speed on wi.countries = cost_speed.countries
	  Order by internet_users DESC,universal_access DESC;

-- countries with highest internet users but lower universal access score
SELECT country.countries, country.internet_users, cost_speed.avg_monthly_cost_in_gbp, wi.universal_access
	  FROM country
      inner join wi on country.countries = wi.countries
	  inner join cost_speed on wi.countries = cost_speed.countries
	  Order by universal_access ASC,internet_users DESC;

-- highest overall score
select country.countries, country.population, wi.overall_score, wi.universal_access,
	wi.freedom_openness, wi.relevant_content, wi.empowerment
	from wi 
	inner join country on wi.countries = country.countries
	order by overall_score DESC, population DESC;

-- countries with highest population and higher overall score
select country.countries, country.population, wi.overall_score, wi.universal_access,
	wi.freedom_openness, wi.relevant_content, wi.empowerment
	from wi 
	inner join country on wi.countries = country.countries
	order by population DESC, overall_score DESC;

-- Internet User count by region
SELECT COUNT(internet_users),country.region
FROM country
GROUP BY region
ORDER BY COUNT(internet_users) DESC;
