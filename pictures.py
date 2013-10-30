from pymongo import MongoClient
import os


client = MongoClient('arqui9.ing.puc.cl', 27017)
db = client.tvdb
actors = db.actors
series = db.series
urls = []
for actor in actors.find({},{'pic': True, '_id':False}):
	urls.append(actor['pic'])
for serie in series.find({},{'pic': True, '_id':False}):
	urls.append(actor['pic'])
for url in urls:
	path = url.split('/')[3:]
	print path
	pathname = "../"
	for i in path[:-1]:
		#if folder doesn't exist create
		pathname += i
		if not os.path.exists(pathname):
			os.makedirs(pathname)
	#if picture (path[-1]) doesn't exist, download 
		#curl url to path
	if !os.path.exists(pathname + path[-1]):
		os.system('curl -o '+pathname+path[-1]+' '+url)
