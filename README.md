## 📘 API Documentation – AI Safety Monitoring System

---

### 🏠 HOME PAGE

#### 🎯 \[GET] Get All Cameras

* **URL:** `/api/cameras`
* **Method:** `GET`
* **Authentication:** Required

**Response:**

```json
[
  {
    "id": 1,
    "name": "CAM1",
    "stream_url": "http://stream.cam1",
    "status": "Safe",
    "recording": true,
    "last_updated": "2025-06-08T14:04:00Z",
    "violations": {
      "red": 5,
      "yellow": 3
    }
  }
]
```

---

### 🎥 CAMERA DETAIL PAGE

#### 🎯 1. \[GET] Camera Detail Info

* **Endpoint:** `/api/cameras/{id}/detail`
* **Method:** `GET`
* **Authentication:** Required

**Response:**

```json
{
  "id": 1,
  "name": "CAM1",
  "stream_url": "http://stream.cam1",
  "total_alerts": 12,
  "violations": {
    "no_helmet": 7,
    "no_vest": 5,
    "no_glass": 3,
    "no_gloves": 2
  },
  "alerts": [
    {
      "timestamp": "2025-02-12T18:25:00Z",
      "violation_type": "no_helmet"
    }
  ]
}
```

#### 🎯 2. \[GET] Camera Violation Trend (Line Chart)

* **Endpoint:** `/api/cameras/{id}/trend`
* **Method:** `GET`
* **Query:** `?from=YYYY-MM-DD&to=YYYY-MM-DD`
* **Authentication:** Required

**Response:**

```json
{
  "labels": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  "data": {
    "no_helmet": [3, 4, 5, 6, 2, 1, 0],
    "no_vest": [2, 3, 3, 2, 1, 0, 1],
    "no_glass": [1, 1, 0, 0, 1, 2, 1]
  }
}
```

---

### 📊 SUMMARY PAGE

#### 🎯 1. \[GET] Summary Dashboard Data

* **Endpoint:** `/api/summary`
* **Method:** `GET`
* **Query:** `?from=YYYY-MM-DD&to=YYYY-MM-DD`

**Response:**

```json
{
  "safety_score": {
    "current": 87,
    "change_percent": 12
  },
  "component_scores": {
    "no_vest": 82,
    "no_helmet": 94,
    "no_glass": 72,
    "no_gloves": 98
  }
}
```

#### 🎯 2. \[GET] Incident Trend (Line Chart)

* **Endpoint:** `/api/summary/trend`
* **Method:** `GET`
* **Query:** `?from=YYYY-MM-DD&to=YYYY-MM-DD`

**Response:**

```json
{
  "labels": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  "data": {
    "no_vest": [5, 7, 6, 4, 3, 2, 1],
    "no_helmet": [10, 11, 15, 13, 9, 6, 7],
    "no_glass": [4, 8, 12, 7, 6, 5, 8],
    "no_gloves": [2, 6, 12, 9, 14, 3, 1]
  }
}
```

#### 🎯 3. \[GET] Incident Distribution (Donut Chart)

* **Endpoint:** `/api/summary/distribution`
* **Method:** `GET`
* **Query:** `?from=YYYY-MM-DD&to=YYYY-MM-DD`

**Response:**

```json
{
  "no_helmet": 3,
  "no_vest": 4,
  "no_glass": 8,
  "no_gloves": 5
}
```

#### 🎯 4. \[GET] Heatmap Activity Overview

* **Endpoint:** `/api/summary/heatmap`
* **Method:** `GET`
* **Query:** `?from=YYYY-MM-DD&to=YYYY-MM-DD`

**Response:**

```json
{
  "Monday": [3, 2, 5, 7, 3, 2, 0],
  "Tuesday": [0, 1, 1, 2, 5, 4, 1],
  "Wednesday": [2, 3, 4, 4, 3, 2, 0]
}
```

#### 🎯 5. \[GET] Download Summary Report

* **Endpoint:** `/api/summary/download`
* **Method:** `GET`
* **Query:** `?from=YYYY-MM-DD&to=YYYY-MM-DD&type=pdf|csv`

Response: PDF/CSV File

---

### 🕒 TIMELINE PAGE

#### 🎯 1. \[GET] Main Event List

* **Endpoint:** `/api/events`
* **Method:** `GET`

**Response:**

```json
[
  {
    "camera_id": 3,
    "camera_name": "Cam 3",
    "timestamp": "2025-02-12T18:25:00Z",
    "violation_type": "no_helmet"
  }
]
```

#### 🎯 2. \[GET] Archive Records

* **Endpoint:** `/api/archives`
* **Query:** `camera_id`, `from`, `to`

**Response:**

```json
[
  {
    "image_url": "http://cdn.site/snapshots/cam1_1825.jpg",
    "timestamp": "2025-02-12T18:25:00Z",
    "situation": "no_helmet"
  }
]
```

#### 🎯 3. \[POST] Send Report

* **Endpoint:** `/api/reports`

**Request Body:**

```json
{
  "image_url": "http://cdn.site/snapshots/cam1_1825.jpg",
  "timestamp": "2025-02-12T18:25:00Z",
  "worker_name": "John Doe",
  "worker_id": "W1234",
  "department": "Logistics",
  "supervisor": "Jane Kim",
  "event": "no_helmet"
}
```

---

### 📄 REPORT PAGE

#### 🎯 1. \[GET] Worker Event Report List

* **Endpoint:** `/api/reports`
* **Method:** `GET`
* **Query:** `from`, `to`, `search`

**Response:**

```json
[
  {
    "worker_id": "2025041",
    "name": "Kim Su Min",
    "date": "2025-05-12T18:01:00Z",
    "event": "no_helmet",
    "alert_status": "ALERTED"
  }
]
```

#### 🎯 2. \[GET] Download Report Data

* **Endpoint:** `/api/reports/download`
* **Method:** `GET`
* **Query:** same as report list

Response: CSV file

#### 🎯 3. \[POST] Send Advisor Alert (Optional)

* **Endpoint:** `/api/reports/alert`
* **Method:** `POST`

**Request Body:**

```json
{
  "worker_id": "2025041",
  "date": "2025-05-12T18:01:00Z"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Advisor notified"
}
```

---

### 🔐 LOGIN PAGE

#### 🎯 \[POST] User Login (Sign In)

* **Endpoint:** `/api/auth/login`
* **Method:** `POST`
* **Auth:** ❌ No

**Request Body:**

```json
{
  "username": "user@example.com",
  "password": "yourPassword123"
}
```

**Response:**

```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "id": 123,
    "name": "Kim Su Min",
    "role": "admin"
  }
}
```
