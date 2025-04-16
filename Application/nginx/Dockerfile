FROM alpine:3.21

RUN apk update
RUN apk add git openssl      build-base bash gcc make cmake g++ zlib-dev linux-headers pcre-dev openssl-dev
RUN apk add certbot certbot-nginx

RUN git clone https://github.com/nginx/nginx.git
RUN git clone --recurse-submodules https://github.com/google/ngx_brotli.git

# generate .so
RUN cd ngx_brotli/deps/brotli && mkdir out && cd out \
    && cmake -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF -DCMAKE_C_FLAGS="-Ofast -m64 -march=native -mtune=native -flto -funroll-loops -ffunction-sections -fdata-sections -Wl,--gc-sections" -DCMAKE_CXX_FLAGS="-Ofast -m64 -march=native -mtune=native -flto -funroll-loops -ffunction-sections -fdata-sections -Wl,--gc-sections" -DCMAKE_INSTALL_PREFIX=./installed .. \
    && cmake --build . --config Release --target brotlienc

RUN cd nginx && ./auto/configure --add-dynamic-module=../ngx_brotli \
    --with-compat --with-http_ssl_module --with-http_v2_module
#end generate

RUN cd nginx && make modules && make && make install

RUN openssl dhparam 1024 > /usr/local/nginx/dhparam.pem

RUN rm /usr/local/nginx/conf/nginx.conf
COPY nginx.conf /usr/local/nginx/conf
COPY sites /usr/local/nginx/sites/


ENTRYPOINT ["/usr/local/nginx/sbin/nginx"]
CMD ["-g", "daemon off;"]