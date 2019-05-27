# wowtrace

WOWTRACE is the blockchain-based traceability solution that helps businesses manage supply-chains with instant, transparent, and immutable data. Wowtrace is a network that allows producers, distributors, retailers, and consumers to retrieve product information reliably and securely through blockchain. 

## Setup:
**1. Back-end:**
  - Docker:
  
    ```docker-compose up -d```
  
  - Migration data:
  
    ```adonis migration:run```
    
    ```adonis seed```
  - Run kafka provider:
  
    ```npm run kafka:listen```
  
    or
  
    ```adonis kafka:listen```
  - Run Back-end service:
  
    ```adonis serve --dev```
    
**2. Front-end:**
  
  ```npm start```
    
