// utils/cacheUtils.js
let cache = {};

export const cacheManager = {
  set: (key, data) => {
    cache[key] = {
      data: data, // Guardamos TODOS los datos, incluyendo imágenes
      timestamp: Date.now()
    };
  },
  
  get: (key) => {
    const item = cache[key];
    return item ? item.data : null;
  },
  
  remove: (key) => {
    delete cache[key];
  },
  
  clear: () => {
    cache = {};
  },
  
  // Método para debug
  debug: () => {
    return cache;
  }
};