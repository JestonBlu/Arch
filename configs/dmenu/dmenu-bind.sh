#!/bin/bash

exe=$(dmenu_run -fn 'Sans Mono-9' -nb '#000000' -nf '#9494b8' -sb '#888A95' -sf '#000000' -b) && eval "exec 
$exe"
