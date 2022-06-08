

# Backend for SehatIn Application

Writted in Node Js using Express Framework

# Documentation

## Base Url
https://sehatin-backend-nyd7sacnna-et.a.run.app/v1

## API Endpoint

### Disease
#### Show Diseases with Screening Question
* **URL**
    /disease/screening

* **Method:**
    `GET`
* **Response**
    * **Code:** 200 <br/>
      **Content:** 
      ```{ 
        "id_penyakit": 1,
        "nama_penyakit": "Apnea tidur obstruktif",
        "screening_questions": [
            {
                "id_pertanyaan": 11,
                "pertanyaan": "Apakah kamu pernah mengantuk yang berlebih pada siang hari?"
            },
            {
                "id_pertanyaan": 12,
                "pertanyaan": "Apakah orang di sekitarmu perna komplain dengan suaramu saat tidur?"
            },
            {
                "id_pertanyaan": 13,
                "pertanyaan": "Apakah kamu sering terbangun tiba-tiba saat tidur malam hari?"
            },
            {
                "id_pertanyaan": 14,
                "pertanyaan": "Apakah kamu sering merasa tercekik saat tidur malam hari?"
            },
            {
                "id_pertanyaan": 15,
                "pertanyaan": "Apakah kamu sering merasakan bibir kering dan sakit kerongkongan saat bangun tidur?"
            },
            {
                "id_pertanyaan": 16,
                "pertanyaan": "Apakah kamu sering merasakan sakit kepala saat bangun tidur?"
            },
            {
                "id_pertanyaan": 17,
                "pertanyaan": "Apakah kamu sering kesulitan untuk fokus saat siang hari?"
            }]
        }

# Deployment

## Using Docker

### Build Docker Image
    docker buildt sehatin-backend .
Using Macbook M1 machine 

    docker buildx build --platform linux/amd64 -t sehatin-backend .

## Deploy docker image to GCP

    docker tag sehatin-backend asia.gcr.io/sehatin-eab72/sehatin-backend
    docker push asia.gcr.io/sehatin-eab72/sehatin-backend      
