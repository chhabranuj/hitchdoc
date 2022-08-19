import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import cardLayoutStyle from "./cardLayout.module.css";
import addDocLayoutStyle from "../addDocLayout/addDocLayout.module.css";

const CardLayout = (props) => {
    const [menuOptions, setMenuOptions] = useState(false);

    const handleMenuOptions = () => {
        setMenuOptions(!menuOptions);
    }

    const handleEditButton = () => {
        props.sendData(props.data);
    }

    const handlePreviewDoc = () => {
        props.getDocFile(props.data.file);
    }

    const handleDate = (roughDate) => {
        const propsDate = new Date(roughDate);
        let date = propsDate.getDate() + "/" + (propsDate.getMonth() + 1) + "/" + propsDate.getFullYear();
        let time = propsDate.getHours() + ':' + propsDate.getMinutes() + ':' + propsDate.getSeconds();
        return date + ", " + time;
    }

    return (
        <div className={cardLayoutStyle.cardParent}>
            <div className={cardLayoutStyle.imageMenuContainer}>
                <div className={cardLayoutStyle.imageContainer} onClick={handlePreviewDoc}>
                    <img 
                        src={props.data.cardImage}
                        alt="Doc Image"
                        width={150}
                        height={150}
                    />
                </div>
                <div style={{width: "8%"}}>
                    <BsThreeDotsVertical style={{color: "white"}} onClick={handleMenuOptions} />
                    {
                        menuOptions && 
                            <div className={addDocLayoutStyle.selectInputOptionsParent}style={{padding: "0 8px", transform: "translate(-75%)"}} onClick={handleEditButton}>
                                <p className={addDocLayoutStyle.selectInputOptions}>Edit Doc</p>
                            </div>
                    }
                </div>
            </div>
            <div style={{marginTop: "20px"}} onClick={handlePreviewDoc}>
                <p className={cardLayoutStyle.cardContent}>Document Category: <span style={{color: "white"}}>{props.data.category}</span></p>
                <p className={cardLayoutStyle.cardContent}>Document Type: <span style={{color: "white"}}>{props.data.type}</span></p>
                <p className={cardLayoutStyle.cardContent}>Document Description: <span style={{color: "white"}}>{props.data.description}</span></p>
                <p className={cardLayoutStyle.cardContent}>Uploaded On : <span style={{color: "white"}}>{handleDate(props.data.uploadedOnDate)}</span></p>
                <p className={cardLayoutStyle.cardContent}>Updated On : <span style={{color: "white"}}>{handleDate(props.data.updatedOnDate)}</span></p>
            </div>
        </div> 
    );
}

export default CardLayout;