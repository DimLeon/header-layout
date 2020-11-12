# header-layout

## Summary about this app:
Initial data is fetched from a json file on page load.
Each time user clicks on the refresh icon new data is appended.
New data on each refresh-click are randomly generated through a given array.

## The logic:
 The most basic data in this app is the deposit value and the Bonus value.
 The deposit amount is each time randomly generated from a given array. 
 The wagered amount each time randomly derives from the deposit amount,
 being one random number up to (not including) the deposit amount. 
 Given that the bonus will be 100% of the deposit value and up to 100 euros,
 rest of the amounts are maths results and dependent on each other.

## Packages used:
node-sass, autoprefixer, modern-css-reset and json-server
