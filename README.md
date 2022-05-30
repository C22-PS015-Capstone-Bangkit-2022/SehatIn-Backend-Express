

## Backend for SehatIn Application

Writted in Node Js using Express Framework

## Documentation
TBA

## Deployment

### Using Docker

#### Build Docker Image
    docker buildt sehatin-backend .
Using Macbook M1 machine 

    docker buildx build --platform linux/amd64 -t sehatin-backend .

### Deploy docker image to GCP

    docker tag sehatin-backend asia.gcr.io/sehatin-eab72/sehatin-backend
    docker push asia.gcr.io/sehatin-eab72/sehatin-backend      