#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
PS1='[\u@\h \W]\$ '

### Environmental Variables
export EDITOR=nano
export TERMINAL=lxterminal
export BROWSER=firefox

# added by Miniconda3 4.2.12 installer
export PATH="/home/jeston/Miniconda3/bin:$PATH"

# Alsi
alsi
