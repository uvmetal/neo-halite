#!/bin/bash
# Curl RPC script


while getopts "m:" opt; do
    case $opt in
        m) multi+=("$OPTARG");;
        #...
    esac
done
shift $((OPTIND -1))

echo "The first value of the array 'multi' is '$multi'"
echo "The whole list of values is '${multi[@]}'"

echo "Or:"

for val in "${multi[@]}"; do
    echo " - $val"
done

return

if [ -z "$1" ]
  then
    echo "No host specified, using http://localhost"
    HOST_URL="http://localhost"
else
  HOST_URL=${1}
fi


if [ -z "$2" ]
  then
    echo "No port specified, using 80"
    HOST_PORT="80"
else
  HOST_PORT=${2}
fi


if [ -z "$3" ]
  then
    echo "No RPC slug provided, using /rpc"
    HOST_RPC_SLUG="/rpc"
else
  HOST_RPC_SLUG=${3}
fi

if [ -z "$4" ]
  then
    echo "No RPC method provided, using executeTaskList"
    RPC_METHOD="executeTaskList"
else
  HOST_RPC_SLUG=${4}
fi


echo ${HOST_URL}:${HOST_PORT}/${HOST_RPC_SLUG} method: ${RPC_METHOD}

curl -X CONNECT --url ${HOST_URL}:${HOST_PORT}/${HOST_RPC_SLUG}_ -d '{"method":"executeTaskList","params":["args"],"id":124334}'
