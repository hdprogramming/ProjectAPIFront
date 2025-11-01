import { useEffect, useState,useRef } from "react";
import styles from "../Modal/modal.module.css";
const Modal = ({ children,btntitle,wndtitle }) => {
    const [isClose,setClose]=useState(true);
    const MainFrame=useRef();
     function onOpen(e)
    {
      e.preventDefault();
      MainFrame.current.className=styles.MainFrame;
    }
    function onClose(e)
    {
      e.preventDefault();
      MainFrame.current.className=styles.MainFrameClose;
    }
    return (
       <div>
        <div><button className={styles.OpenButton} onClick={onOpen}>{btntitle}</button></div>
         <div ref={MainFrame} className={styles.MainFrameClose}>
          <div className={styles.Content}>
            <div className={styles.MenuBar}><label style={{margin:'3px'}}>{wndtitle}</label><button onClick={onClose}>X</button></div>
            <div style={{margin:'10px'}}>
          {children(onClose)}
           </div>
          </div>
        </div>
        </div>
       
    );
}
export default Modal;