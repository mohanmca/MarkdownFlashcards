 ## a
```java
a
```
<!-- ---- -->

<!-- ## b
```java -->
<!-- b
``` -->
<!-- ---- -->
## c
```java
// Additional package java.net.http
java.net.http.HttpClient
java.net.http.HttpRequest
java.net.http.HttpResponse
java.net.http.WebSocket
```
----

## d
```
d
```

----

## e
* Browser requests a secure page with https url
* WebServer sends it's public-key with server certificate
* Browser ensures the certifcate is valid
  * Certificate is not expired
  * Not revoked
  * Issued by a Trusted 3rd party
* Browser creates a Symmetric Key and sends it to the Server (after encrypting using webserver's public-key)
* WebServer decrypts the symmetric key using its private key
* WebServer sends page encrypted with the Symmetric key (of the client)
* Browser decrypts the page using symmetric key and displays the content

----