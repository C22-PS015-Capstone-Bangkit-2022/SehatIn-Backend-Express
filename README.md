

# Backend for SehatIn Application

Writted in Node Js using Express Framework

# Documentation

## Base Url
https://sehatin-backend-nyd7sacnna-et.a.run.app/v1

## API Endpoint

### Disease
#### Show All Diseases with Screening Question
* **URL**
    /disease/screening

* **Method:**
    `GET`
* **Response**
    * **Code:** 200 <br/>
      **Content:** 
      ``` 
      { 
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
        },
        {
            ....
        }

#### Show All Diseases
* **URL**
    /disease/all

* **Method:**
    `GET`
* **Response**
    * **Code:** 200 <br/>
      **Content:** 
      ``` 
      [
            {
                "id_penyakit": 1,
                "nama_penyakit": "Apnea tidur obstruktif"
            },
            {
                "id_penyakit": 2,
                "nama_penyakit": "Kanker Kolon"
            },
            {
                "id_penyakit": 3,
                "nama_penyakit": "Stroke"
            },
            {
                "id_penyakit": 4,
                "nama_penyakit": "Diabetes Mellitus"
            },
            {
                "id_penyakit": 5,
                "nama_penyakit": "Penyakit Ginjal Kronis"
            },
            {
                "id_penyakit": 6,
                "nama_penyakit": "Asam Urat"
            },
            {
                "id_penyakit": 7,
                "nama_penyakit": "Metabolic Syndrome (General)"
            }
        ]

#### Show Disease by id
* **URL**
    /disease/find/:id

* **Method:**
    `GET`
*  **URL Params**

   **Required:** 
   `id=[integer]`

* **Response**
    * **Code:** 200 <br/>
      **Content:** 
      ```
        {
            "id_penyakit": 1,
            "nama_penyakit": "Apnea tidur obstruktif"
        }

#### Show Screening Question by id disease
* **URL**
    /disease/find/:id/screening

* **Method:**
    `GET`
*  **URL Params**

   **Required:** 
   `id=[integer]`

* **Response**
    * **Code:** 200 <br/>
      **Content:** 
      ```
        {
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

#### Show All Good Food
* **URL**
    /disease/allGoodFood

* **Method:**
    `GET`

* **Response**
    * **Code:** 200 <br/>
      **Content:**
      ```
        [
            {   
                "id_food": 67,
                "nameId": "Brokoli",
                "nameEn": "broccoli",
                "energy": 0.34,
                "avg_portion": 60,
                "fat": 0.006,
                "protein": 0.043,
                "carbs": 0.032,
                "type_food": "Vegetables",
                "thumbnail_image": "https://images-prod.healthline.com/hlcmsresource/images/AN_images/health-benefits-of-broccoli-1296x728-feature.jpg"
            },
            {
                ...
            }
        ]

#### Show All Bad Food
* **URL**
    /disease/allBadFood

* **Method:**
    `GET`

* **Response**
    * **Code:** 200 <br/>
      **Content:**
      ```
        [{
            "id_food": 17,
            "nameId": "Kentang Goreng",
            "nameEn": "french-fries",
            "energy": 2.9,
            "avg_portion": 115,
            "fat": 0.142,
            "protein": 0.035,
            "carbs": 0.397,
            "type_food": "Fried Food",
            "thumbnail_image": "https://firebasestorage.googleapis.com/v0/b/sehatin-eab72.appspot.com/o/FOOD_IMAGE%2F16frenchfries.jpg?alt=media&token=d0d971c9-c8de-43df-995c-f9158d0a507b"
        },
        {
            ...
        }]

#### Show All Good Food by User's Disease
* **URL**
    /disease/my/goodFood

* **Method:**
    `GET`
* **HEADER**
    Authorization: `Bearer ${idToken}`

* **Response**
    * **Code:** 200 <br/>
      **Content:**
      ```
        {
            "message": "Success",
            "error": null,
            "ok": true,
            "sport": [
                {
                    "id_sport": 8,
                    "category": "Aktivitas Sedang",
                    "activity": "Berjalan Santai (4 km/h)",
                    "energy": 210,
                    "thumbnail_image": "https://domf5oio6qrcr.cloudfront.net/medialibrary/5296/h1018d16207257705529.jpg"
                },
                {
                    ...
                }
            ]
        }

#### Show Disease by multiple id
* **URL**
    /disease/searchById

* **Method:**
    `GET`
* **Data Query**
    `id=[integer]`

* **Response**
    * **Code:** 200 <br/>
      **Content:**
      ```
        [
            {
                "id_penyakit": 1,
                "nama_penyakit": "Apnea tidur obstruktif"
            },
            {
                "id_penyakit": 3,
                "nama_penyakit": "Stroke"
            },
            {
                "id_penyakit": 4,
                "nama_penyakit": "Diabetes Mellitus"
            }
        ]

### Screening Question
#### Show All Screening Questions
* **URL**
    /screening-question

* **Method:**
    `GET`
* **Response**
    * **Code:** 200 <br/>
      **Content:**
      ```
      [
        {
            "id_pertanyaan": 1,
            "pertanyaan": "Apakah umur kamu lebih dari 60 tahun?",
            "untuk_penyakit": 7
        },
        {
        "id_pertanyaan": 2,
        "pertanyaan": "Apakah kamu memiliki kelebihan berat badan",
        "untuk_penyakit": 7
        },
        {
            ...
        }
      ]

### Articles
#### Show All Articles
* **URL**
    /articles

* **Method:**
    `GET`

* **Data Query**
    `page=[integer]&size=[integer]`
* **Response**
    * **Code:** 200 <br/>
      **Content:**
      ```  
        {
          "totalItems": 7,
          "articles": [
            {
                "tag": [
                    "tips",
                    "Stroke"
                ],
                "id_artikel": 12,
                "judul": "Cara Mengelola Stress saat Pandemi",
                "isi_artikel": "Stress merupakan bagian dari proses adaptasi terhadap persoalan atau perubahan yang terjadi dalam hidup. Stress dapat dijumpai di berbagai tempat, baik itu di rumah, tempat kerja, lingkungan sekitar, dan sebagainya serta dapat berbentuk kecil, sedang, ataupun besar.",
                "thumbnail_image": "https://storage.googleapis.com/sehatin-eab72.appspot.com/ARTICLE_IMAGE/1654083633304_Cara-Mengelola-Stress-saat-Pandemi.jpg",
                "source_link": "https://rs-soewandhi.surabaya.go.id/cara-mengelola-stress-saat-pandemi/",
                "source_name": null,
                "created_at": "2022-06-01T11:42:56+08:00"
            }, 
            {
                ...
            }]
        }


#### Show Article by id
* **URL**
    /articles/:id

* **Method:**
    `GET`
*  **URL Params**

   **Required:** 
   `id=[integer]`

* **Response**
    * **Code:** 200 <br/>
      **Content:** 
      ```
        {
            "tag": [
                "tips",
                "Stroke"
            ],
            "id_artikel": 12,
            "judul": "Cara Mengelola Stress saat Pandemi",
            "isi_artikel": "Stress merupakan bagian dari proses adaptasi terhadap persoalan atau perubahan yang terjadi dalam hidup. Stress dapat dijumpai di berbagai tempat, baik itu di rumah, tempat kerja, lingkungan sekitar, dan sebagainya serta dapat berbentuk kecil, sedang, ataupun besar.",
            "thumbnail_image": "https://storage.googleapis.com/sehatin-eab72.appspot.com/ARTICLE_IMAGE/1654083633304_Cara-Mengelola-Stress-saat-Pandemi.jpg",
            "source_link": "https://rs-soewandhi.surabaya.go.id/cara-mengelola-stress-saat-pandemi/",
            "source_name": null,
            "created_at": "2022-06-01T11:42:56+08:00"
        }       


#### Add Article 
* **URL**
    /articles/new

* **Method:**
    `POST`

* **Request**
    * **Content:**
    ```
     {
        "tag": [
            "tips",
            "Stroke"
        ],
        "id_artikel": 12,
        "judul": "Cara Mengelola Stress saat Pandemi",            "isi_artikel": "Stress merupakan bagian dari proses adaptasi terhadap persoalan atau perubahan yang terjadi dalam hidup. Stress dapat dijumpai di berbagai tempat, baik itu di rumah, tempat kerja, lingkungan sekitar, dan sebagainya serta dapat berbentuk kecil, sedang, ataupun besar.",
        "thumbnail_image": "https://storage.googleapis.com/sehatin-eab72.appspot.com/ARTICLE_IMAGE/1654083633304_Cara-Mengelola-Stress-saat-Pandemi.jpg",
        "source_link": "https://rs-soewandhi.surabaya.go.id/cara-mengelola-stress-saat-pandemi/",
        "source_name": null,
        "created_at": "2022-06-01T11:42:56+08:00"
    } 
* **Response**
    * **Code:** 201 <br/>
      **Content:**
      ```
       {
            "tag": [
                "tips",
                "Stroke"
            ],
            "id_artikel": 12,
            "judul": "Cara Mengelola Stress saat Pandemi",
            "isi_artikel": "Stress merupakan bagian dari proses adaptasi terhadap persoalan atau perubahan yang terjadi dalam hidup. Stress dapat dijumpai di berbagai tempat, baik itu di rumah, tempat kerja, lingkungan sekitar, dan sebagainya serta dapat berbentuk kecil, sedang, ataupun besar.",
            "thumbnail_image": "https://storage.googleapis.com/sehatin-eab72.appspot.com/ARTICLE_IMAGE/1654083633304_Cara-Mengelola-Stress-saat-Pandemi.jpg",
            "source_link": "https://rs-soewandhi.surabaya.go.id/cara-mengelola-stress-saat-pandemi/",
            "source_name": null,
            "created_at": "2022-06-01T11:42:56+08:00"
        }

#### Edit Article 
* **URL**
    /articles/edit/:id

* **Method:**
    `PUT`

*  **URL Params**

   **Required:** 
   `id=[integer]`

* **Request**
    * **Content:**
    ```
     {
        "tag": [
            "tips",
            "Stroke"
        ],
        "id_artikel": 12,
        "judul": "Cara Mengelola Stress saat Pandemi",            "isi_artikel": "Stress merupakan bagian dari proses adaptasi terhadap persoalan atau perubahan yang terjadi dalam hidup. Stress dapat dijumpai di berbagai tempat, baik itu di rumah, tempat kerja, lingkungan sekitar, dan sebagainya serta dapat berbentuk kecil, sedang, ataupun besar.",
        "thumbnail_image": "https://storage.googleapis.com/sehatin-eab72.appspot.com/ARTICLE_IMAGE/1654083633304_Cara-Mengelola-Stress-saat-Pandemi.jpg",
        "source_link": "https://rs-soewandhi.surabaya.go.id/cara-mengelola-stress-saat-pandemi/",
        "source_name": null,
        "created_at": "2022-06-01T11:42:56+08:00"
    } 
* **Response**
    * **Code:** 200 <br/>
      **Content:**
      ```
      {
        "message": "Article successfully updated!"
      }

#### Delete Article 
* **URL**
    /articles/edit/:id

* **Method:**
    `DELETE`

*  **URL Params**

   **Required:** 
   `id=[integer]`
      
* **Response**
    * **Code:** 201 <br/>
      **Content:**
      ```
      {
          "message": "Article successfully deleted!"
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
