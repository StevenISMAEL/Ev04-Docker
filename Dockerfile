FROM quay.io/wildfly/wildfly:latest-jdk21

# Copia el WAR
COPY target/*.war /opt/jboss/wildfly/standalone/deployments/

# Copia driver JDBC
COPY docker/postgresql-42.7.8.jar /tmp/postgresql.jar

# Copia script CLI para configurar módulo + datasource
COPY docker/configure-wildfly.cli /tmp/configure-wildfly.cli

# Ejecuta el CLI en modo embebido para dejar configurado el server
RUN /opt/jboss/wildfly/bin/jboss-cli.sh --file=/tmp/configure-wildfly.cli