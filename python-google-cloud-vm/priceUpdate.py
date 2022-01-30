#note the below is a copy of the python script running in our Ubuntu VM on G-Cloud
#certain extra comments have been added to this file for explanation
import pandas as pd
import os
from pathlib import Path
import time

while True:
    #retrieve the old price data - below is file path within VM
    oldData = pd.read_csv (r'/home/jr4162/files/oldPrices.csv')
    print(oldData)
    #retreive new price data
    newData = pd.read_html('https://finance.yahoo.com/cryptocurrencies')[0]
    print(newData)
    #create a more detailed data set that gives the price change too
    deltaData = newData
    deltaData['Change'] = (newData.loc[:,'Price (Intraday)'] - oldData.loc[:,'Price (Intraday)'])/oldData.loc[:,'Price (Intraday)']
    nameCol = deltaData.loc[:,'Name']
    dataCol = deltaData.loc[:,'Change']
    outputData = pd.concat([nameCol.reset_index(drop=True),dataCol.reset_index(drop=True)],axis=1)
    print(outputData)
    #update old prices, save deltaData
    oldData = newData
   # cwd = os.getcwd()
   # print(cwd)
   # old_fileSpot = cwd + '/files/oldPrices.csv'
   # new_fileSpot = cwd + '/files/priceChanges.csv'
   # filepath = Path(old_fileSpot)
   # filepath.parent.mkdir(parents=True,exist_ok=True)
    oldData.to_csv(r'/home/jr4162/files/oldPrices.csv')
   # filepath = Path(new_fileSpot)
   # filepath.parent.mkdir(parents=True,exist_ok=True)
    outputData.to_csv(r'/home/jr4162/files/priceChanges.csv')
    #make a call to the command line to export the files to G-Cloud bucket storage, then prices changes can be accessed by our game
    os.system('gsutil -h "Cache-Control:public, max-age=0" cp -r ./files gs://crypto_stuff')

    time.sleep(120)
