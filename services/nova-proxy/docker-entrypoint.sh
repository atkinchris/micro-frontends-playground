#!/bin/sh

# Fail on the first error, rather than continuing
set -e

# Replace upstream host URL in config file.
# Pipe is used as a delimiter for sed, because UPSTREAM likely contains the usual forward slash
sed -i "s|UPSTREAM|$UPSTREAM|g" $CONFIG_FILE

# Run nova-proxy
$@
