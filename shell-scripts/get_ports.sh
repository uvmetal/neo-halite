#!/bin/bash

# extract ports
echo -e "\n all the stuff (verify me if you will!)"
ps aux | grep -G "neo.*:[0-9]*" | sed 's/.*:\([0-9]*\)..*/\1/;t;d'


# extract rpc info
echo -e "\n metrics port"
ps aux | grep -G "neo" | sed 's/^.*\(http:\/\/.*:[0-9]*\/rpc\)..*/\1/;t;d'


# extract metrics port
echo -e "\n metrics port"
ps aux | grep -G "neo" | sed 's/.*\--metrics-port \([0-9]*\).*/http:\/\/localhost:\1/;t;d'


# extract sql port
echo -e "\n sql port"
ps aux | grep -G "neo" | sed 's/.*\--port \([0-9]*\).*/http:\/\/localhost:\1/;t;d'
