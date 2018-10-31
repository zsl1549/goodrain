FROM nginx
ADD ./dist/ /usr/share/nginx/html/
ADD ./nginx/ui.conf /etc/nginx/conf.d/
EXPOSE 80
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]