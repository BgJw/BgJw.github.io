import { useEffect } from "react";

const LazyLoadImages = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          obs.unobserve(img);
        }
      });
    }, { threshold: 0.3 });

    const mutationObserver = new MutationObserver(() => {
      const images = document.querySelectorAll('img.lazy');
      images.forEach(img => observer.observe(img));
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
};

export default LazyLoadImages;
