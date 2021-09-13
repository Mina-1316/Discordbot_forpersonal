node .src/botinit.js
if [ $? -eq 0 ];then
    echo "success"
else
    echo "Failure occured, changing path"
    node ./botinit.js
    if [ $? -eq 0 ]; then
        echo "Path changed, suceess"
    else
        echo "falure occured"
        exit 9
fi
