


import os
ret= []
for r,d,f in os.walk('.'):
    for q in f:
        if '.srt' in q: ret.append(q)
lesson='04'
ret= sorted(ret)
count= 0
for x in ret:
    count+= 1
    a= '.'
    v= 'var srtm{}{:02d}= `'.format(lesson,count)
    v1= '`;'
    s= x.strip()
    s= [v,s,a]
    s= '\n'.join(s)
    s= s.rstrip()
    s= [s,v1]
    print (''.join(s))
    print('\n')

contentm= [ 'srtm{}{:02d}'.format(lesson,x) for x in range(1,len(ret)+1) ]
print ('var srtm{}= [{}];'.format(lesson,','.join(contentm)));