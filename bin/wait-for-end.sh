#!/bin/bash

set -e

sleep 10

host="$1"
shift
cmd="$@"

while ping $host -c 1 &>/dev/null; do
  sleep 10
done

echo "Node has finished"
exec $cmd
