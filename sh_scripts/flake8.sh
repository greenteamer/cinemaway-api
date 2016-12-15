#!/usr/bin/env bash
echo "***********************************************"
echo "***************** install *********************"
echo "***********************************************"

echo "***********************************************"
echo "---apt update e upgrade---"
echo "***********************************************"
apt-get -y update

echo "***********************************************"
echo "---OS dependencies---"
echo "***********************************************"
apt-get -y install python-pip
apt-get -y install python-dev python-setuptools
python -m pip install flake8

echo "***********************************************"
echo "---install dependencies (including django)  ---"
echo "***********************************************"
pip install --upgrade pip
pip install -r deps.pip

echo "***********************************************"
echo "--- Check PEP8 Standards                    ---"
echo "***********************************************"
flake8
