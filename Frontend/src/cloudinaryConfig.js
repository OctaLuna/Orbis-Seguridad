// src/cloudinaryConfig.js
import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'diswqpy8v' // <== reemplaza con el tuyo
  }
});

export default cld;
