"""
Update google trend data and push to repository
"""
# import requests
from subprocess import call

workDir = 'C:/Users/tinta/OneDrive/Documents/Web_development/googleTrends/'

# Download new data file
# url = 'http://risp.puertosdetenerife.org/dataset/eff95e11-4baa-4ab8-aeb2-33d80c6395d8/resource/4b31504e-fd63-4eba-a9ef-6663a12d5dd0/download/crucerosprevistos.csv'
# myfile = requests.get(url)
# open(workDir + 'crucerosprevistos_Tenerife.csv', 'wb').write(myfile.content)

# Push commit
call(['node', 'updateData.js'], cwd=workDir)
# call(['git', 'commit', '-m', '"Update data"'], cwd=workDir)
# call(['git', 'push', 'origin', 'master'], cwd=workDir)
