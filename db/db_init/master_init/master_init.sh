#!/bin/bash
echo "*** creating replica user and default db... ***"

mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "
    CREATE USER '$REPLICA_USER'@'%' IDENTIFIED BY '$REPLICA_PASSWORD';
    GRANT REPLICATION SLAVE, SELECT ON *.* TO '$REPLICA_USER'@'%';"

echo "*** finished creating replica user and default db ***"
