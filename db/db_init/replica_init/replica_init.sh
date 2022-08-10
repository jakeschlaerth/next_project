#!/bin/bash
echo "*** creating replica user and changing replica master... ***"

mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "CHANGE MASTER TO
  MASTER_HOST='master',
  MASTER_USER='$REPLICA_USER',
  MASTER_PASSWORD='$REPLICA_PASSWORD',
  MASTER_PORT=3306,
  MASTER_CONNECT_RETRY=10;
  CREATE USER '$REPLICA_USER'@'%' IDENTIFIED BY '$REPLICA_PASSWORD';
  GRANT SELECT ON *.* TO '$REPLICA_USER'@'%';"

echo "*** finished creating replica user and changing replica master ***"
