# API Reference

## Introduction

The Nuber API is organized around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

## Admin Routes

<br/>

### GET /api/admin/

retrieve all admins from database <br/>
<br/>

### POST /api/admin/addAdmin

Add new Admin to database<br/>
Body:

```
{
    name: string
}
```

<br/>

### DELETE /api/admin/:id

Delete Admin by id<br/>
```params: id = admin's id```
<br/>
<br/>

### POST /api/admin/addDriver

Add new driver to database<br/>
Body:

```
{
    name: string,
}
```

<br/>

### DELETE /api/admin/removeDriver/:id

Delete driver by id<br/>
```params: id = driver's id```
<br/>
<br/>

### POST /api/admin/addRider

Add new rider to database<br/>
Body:

```
{
    name: string,
}
```

<br/>

### DELETE /api/admin/removeRider/:id

Delete rider by id<br/>
```params: id = rider's id```
<br/>
<br/>

## Rider Routes

<br/>

### GET /api/rider/

retrieve all riders from database <br/>
<br/>

### GET /api/rider/viewDriverByRating/

retrieve all drivers sorted by rating
<br/>
<br/>


### GET /api/rider/seeDriverLocation/:id

retrieve current assigned driver's location if any
<br/>
```params: id = rider's id```
<br/>
<br/>

### GET /api/rider/viewDriverCapacity/:id

retrieve current assigned driver's capacity if any
<br/>
```params: id = rider's id```
<br/>
<br/>

### GET /api/rider/findNearByDrivers/:id

retrieve all available nearby Drivers: **Must have a location set as a rider**  
<br/>
```params: id = rider's id```
<br/>
<br/>

### GET /api/rider/viewDriverPetPrefs/:id

view a specific driver's pet preference
<br/>
```params: id = driver's id```
<br/>
<br/>

### POST /api/rider/selectDriver

select a driver as your driver for your ride<br/>
<br/>
Body:

```
{
    driverId: number,
    riderId: number
}
```

<br/>

### POST /api/rider/leaveDriverRating

Leave driver a rating as a rider<br/>
return's driver obj with updated ratings and rating average
<br/>
Body:

```
{
    driverId: number,
    rating: number
}
```

<br/>

### PUT /api/rider/setRiderDestination

set a valid destination as a rider<br/>
<br/>
Body:

```
{
    riderId: number,
    destination: string
}
```

<br/>

### PUT /api/rider/setRiderLocation

set a valid current location as a rider<br/>
<br/>
Body:

```
{
    riderId: number,
    location: string
}
```

<br/>


## Driver Routes

<br/>

### GET /api/driver/

retrieve all drivers from database <br/>
<br/>


### GET /api/driver/seeRiderDestination/:id

retrieve current assigned rider destination if any
<br/>
```params: id = driver's id```
<br/>
<br/>

### GET /api/driver/getAssignedRiderLocation/:id

retrieve current assigned rider location if any
<br/>
```params: id = driver's id```
<br/>
<br/>
### POST /api/driver/leaveRiderRating

Leave rider a rating as a driver<br/>
return's rider obj with updated ratings and rating average
<br/>
Body:

```
{
    riderId: number,
    rating: number
}
```

<br/>

### PUT /api/driver/updateDriverAvailability

Update driver availability status<br/>
Body:

```
{
    driverId: number,
    availability: bool
}
```

<br/>

### PUT /api/driver/updateDriverCapacity

Update driver Capacity status<br/>
Body:

```
{
    driverId: number,
    vehicleCapacity: number
}
```

<br/>

### PUT /api/driver/updateDriverPosition

Update driver Position status<br/>
Body:

```
{
    driverId: number,
    position: {
        latitude: number, 
        longitude: number 
    }
}
```

<br/>

### PUT /api/driver/updateDriverPet

Update driver pet status<br/>
Body:

```
{
    petsAllowed: Bool,
}
```

<br/>
