from pymongo import MongoClient
import os
import time

#This process will repeat after n seconds
while True:
	try:
		#connects to database through arqui9.ing.puc.cl
		client = MongoClient('arqui9.ing.puc.cl', 27017)
		db = client.tvdb
		actors = db.actors
		series = db.series
		#urls will store all the pics' urls from actors and series
		urls = []
		#additions will be the number of files downloaded in this cycle
		additions = 0
		for actor in actors.find({},{'pic': True, '_id':False}):
			urls.append(actor['pic'])
		for serie in series.find({},{'pic': True, '_id':False}):
			urls.append(actor['pic'])
		for url in urls:
			#path is the relative path as an array e.g.:['images', 'm', 'blabla.jpg']
			path = url.split('/')[3:]
			pathname = "../"
			for i in path[:-1]:
				#if folder doesn't exist create
				pathname += i + '/'
				if not os.path.exists(pathname):
					os.makedirs(pathname)
			#if picture (path[-1]) doesn't exist, download 
				#curl url to path
			if not os.path.exists(pathname + path[-1]):
				os.system('curl -o '+pathname+path[-1]+' '+url)
				additions += 1
		if additions:
			print "Added " + additions.to_s + " new pictures"
	except:
		pass
	time.sleep(1000)