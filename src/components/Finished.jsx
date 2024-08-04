import finishedStyles from '../styles/Finished.module.css'

import Thankyou from '../assets/icon-thank-you.svg'

const Finished = () => {



    return (
        <div className={finishedStyles.finished_container}>
            <img src={Thankyou} alt='Finished!' aria-label='Congrats! You finished!'/>
            <h1>Thank You!</h1>
            <summary>Thanks for confirming  your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</summary>
        </div>
    )
}

export default Finished