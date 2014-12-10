nodeThermostat
==============
A nodeJs thermostat using ds18x20 thermometers.

dependencies
============
thermRonStat java daemon (see my GitHub projects)
node 
npm

install
=======
npm install -g express
npm install -g bower
npm install -g nodemon
npm install 

configure
=========
edit thermostat.properties with the ID's of your ds18x20's
edit relays.properties to point to the GPIO files for each relay.

run
===
thermRonStat java daemon should be running to actually act as a thermostat.
nohup node server.js&
