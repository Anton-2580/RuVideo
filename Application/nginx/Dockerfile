FROM alpine:3.21

RUN apk add --update build-base git bash gcc make g++ zlib-dev linux-headers pcre-dev openssl-dev
RUN git clone https://github.com/nginx/nginx.git
RUN git clone https://github.com/arut/nginx-rtmp-module.git
RUN cd nginx && ./auto/configure --add-module=../nginx-rtmp-module && make && make install

RUN rm /usr/local/nginx/conf/nginx.conf
COPY nginx.conf /usr/local/nginx/conf

ENTRYPOINT ["/usr/local/nginx/sbin/nginx"]
CMD ["-g", "daemon off;"]