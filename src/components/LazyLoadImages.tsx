import { useEffect } from "react";

const LazyLoadImages = () => {
  useEffect(() => {
    const images = document.querySelectorAll('img.lazy');

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
            const image = entry.target as HTMLImageElement;
            image.src = image.dataset.src || '';  
            image.classList.remove('lazy');
            observer.unobserve(image); 
          }
      });
    }, { threshold: 0.3 }); 


    images.forEach(image => {
      observer.observe(image);
    });


    return () => {
      images.forEach(image => {
        observer.unobserve(image);
      });
    };
  }, []);

  return null;
};

export default LazyLoadImages;
