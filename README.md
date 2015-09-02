# INSS Prototype Services

Some prototype service written in NodeJS designed to seed data from CSV files (in the data directory).

# Installation

**Step 1 - Install Meteor**

*Mac and Linux*

>curl https://install.meteor.com/ | sh

*Windows*

See meteor.com/install

**Step 2 - Clone repo and cd into directory**

**Step 3 - run the meteor server**

>meteor

# Availible Services

**Service Status** : http://localhost:3000

**PostCode Lookup** : http://localhost:3000/v1/postcodes/?q=PL14PD

**Managed Parties** : http://localhost:3000/v1/managed_parties/?q=bank


# Re-seeding the database

*If you have updated on of the data files you can simple reset the database and the app will automatically re-seed upon restart*

>meteor reset

>meteor
