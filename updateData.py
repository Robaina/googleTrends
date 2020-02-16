"""
Update google trend data and push to repository
"""
from subprocess import call

workDir = 'C:/Users/tinta/OneDrive/Documents/Web_development/googleTrends/'

# Push commit
call(['node', 'updateData.js'], cwd=workDir)
call(['git', 'add', 'CountryTrends.json'], cwd=workDir)
call(['git', 'commit', '-m', '"Update data"'], cwd=workDir)
call(['git', 'push', 'origin', 'master'], cwd=workDir)
