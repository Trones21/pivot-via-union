Generates SQL statement to unpivot multiple tables/columns (Rows to columns)

Background: I was creating a data quality dashboard in Tableau and I needed to pivot the data. Unfortunately the data source was SAP HANA, so I did not have PIVOT/UNPIVOT operators... and even if I did sql is super messy.

So what do you do when you have thousands of lines of repetitive SQL Generate it of course! 

I was considering using cursors or Userdefinedfunctions,
but those would be DB specific, this is standard SQL, so it will work on any relational DB.

**To Do:**
* create video and question mark icon for modal pop-up
* fix font in the input boxes
* Make onClick be full length of bar
*Smooth transition when opening input area
*Remove table option
*Make unpivot logo nicer -- spin? Transparent 
*Make unpivot logo give the full output
*Turn off spell check in column input box
