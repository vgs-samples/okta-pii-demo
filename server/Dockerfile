FROM python:alpine3.7 
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
WORKDIR /app/app
EXPOSE 5000 
ENTRYPOINT [ "python" ] 
CMD [ "app.py" ]
