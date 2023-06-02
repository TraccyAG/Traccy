import { useHistory } from "react-router-dom";
import "./index.scss"

const RightNumbers = ({ showContent }) => {
  const router = useHistory();
  return (
    <>
      {/* {showContent === 0 &&
        <div className='bottom-left-details details1'>
          <div className='numbers'>
            <div className='color-bar'></div>
          </div>
          <div className='right-content'>
            <h4>01 LynxVr</h4>
          </div>
        </div>
      }
      {showContent === 1 &&
        <div className='bottom-left-details details2'>
          <div className='numbers'>
            <div className='color-bar'></div>
          </div>
          <div className='right-content'>
            <h4>02 Green Protocol</h4>
          </div>
        </div>
      } */}
      {showContent === 2 &&
        <div className='bottom-left-details details3'>
          <div className='numbers'>
            <div className='color-bar'></div>
          </div>
          <div className='right-content'>
            <h4>01 Traccy Solar</h4>
          </div>
        </div>
      }
      {showContent === 3 &&
        <div className='bottom-left-details details4'>
          <div className='numbers'>
            <div className='color-bar'></div>
          </div>
          <div className='right-content'>
            <h4>02 Traccy Lab</h4>
          </div>
        </div>
      }
      {showContent === 4 &&
        <div className='bottom-left-details details5'>
          <div className='numbers'>
            <div className='color-bar'></div>
          </div>
          <div className='right-content'>
            <h4>03 Traccy Farm</h4>
          </div>
        </div>
      }
      <div className='right-numbers'>
        <ul>
          {/* <li className={showContent === 0 ? 'selected' : ''} onClick={() => router.push("/impact-through-traccy-details/lynx")}>
            01 <span>LYNXVR<br />JAKARTA, INDONESIA</span>
          </li>
          <li className={showContent === 1 ? 'selected' : ''}
            onClick={() => router.push("/impact-through-traccy-details/green-protocol")}>
            02 <span>GREEN PROTOCOL<br />JAKARTA, INDONESIA</span>
          </li> */}
          <li className={showContent === 2 ? 'selected' : ''}
            onClick={() => router.push("/impact-through-traccy-details/traccy-solar")}>
            01 <span>TRACCY SOLAR<br />DR CONGO</span>
          </li>
          <li className={showContent === 3 ? 'selected' : ''}
            onClick={() => router.push("/impact-through-traccy-details/traccy-lab")}>
            02 <span>TRACCY LAB<br />ZURICH, SWITZERLAN</span>
          </li>
          <li className={showContent === 4 ? 'selected' : ''}
            onClick={() => router.push("/impact-through-traccy-details/traccy-farm")}
          >
            03 <span>TRACCY FARM<br /> DR CONGO</span>
          </li>
        </ul>
      </div>
    </>

  )
}


export default RightNumbers;