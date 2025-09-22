import { useEffect } from 'react';

function ModalDialogScrollLock() {
    const toggleBodyScroll = () => {
      const modalExists = document.querySelector(".modal-dialog") !== null;
      document.body.style.overflow = modalExists ? "hidden" : "";
    };
  
    useEffect(() => {
      toggleBodyScroll();
  
      const observer = new MutationObserver(toggleBodyScroll);
      observer.observe(document.body, { childList: true, subtree: true });
  
      return () => {
        observer.disconnect();
        document.body.style.overflow = "";
      };
    }, []);
  
    return null;
  }

  export default ModalDialogScrollLock;
