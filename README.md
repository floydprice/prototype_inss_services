# INSS Prototype Services

Some prototype service written in NodeJS designed to seed data from CSV files (in the data directory).

**Step 1 - Install Meteor**

*Mac and Linux*

curl https://install.meteor.com/ | sh

*Windows*

See meteor.com/install

**Step 2 - Clone repo and cd into directory**

**Step 3 - run the meteor server**

>meteor

**Now visit**

Service Status : http://localhost:3000

PostCode Lookup : http://localhost:3000/v1/postcodes/?q=PL14PD

Managed Parties: http://localhost:3000/v1/managed_parties/?q=bank


**To Re-seed**
>meteor reset
