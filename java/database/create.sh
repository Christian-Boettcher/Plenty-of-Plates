#!/bin/bash
BASEDIR=$(dirname $0)
DATABASE=final_capstone
psql -U postgres -f "$BASEDIR/dropdb.sql" &&
createdb -U postgres $DATABASE &&
psql -U postgres -d $DATABASE -f "$BASEDIR/schema.sql" &&
psql -U postgres -d $DATABASE -f "$BASEDIR/users_restaurants.sql" &&
psql -U postgres -d $DATABASE -f "$BASEDIR/event.sql" &&
psql -U postgres -d $DATABASE -f "$BASEDIR/event_restaurants.sql" &&
psql -U postgres -d $DATABASE -f "$BASEDIR/event_guests.sql" &&
psql -U postgres -d $DATABASE -f "$BASEDIR/user.sql"

