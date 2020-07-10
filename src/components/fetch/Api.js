import React, { Component } from 'react';
import { Platform } from 'react-native'; 
  
const post = (domain, data) =>{   
    return fetch(domain,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data) 
    })
    .then((response) => response.json())
}  

const get = (domain) => {
    return fetch(domain)
    .then((response) => response.json())
} 
 
export default {
  post, 
  get,  
}
