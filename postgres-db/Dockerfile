FROM postgres:10.4-alpine

ADD ./data/*.sql /docker-entrypoint-initdb.d/

COPY . /

CMD ["bash", "startup.sh"]