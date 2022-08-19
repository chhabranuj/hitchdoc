import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import CardLayout from "../cardLayout/cardLayout";
import InputLayout from "../inputLayout/inputLayout";
import ButtonLayout from "../buttonLayout/buttonLayout";
import landingLayoutStyle from "./landingLayout.module.css";

const LandingLayout = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const [data, setData] = useState([]);
    const [fileUrl, setFileUrl] = useState("");
    const [searchData, setSearchData] = useState(true);
    const [showPreview, setShowPreview] = useState(false);
    const [dateButtonText, setDateButtonText] = useState("NEW TO OLD");

    const buttonStyleContent = {
        buttonText: "+ Add Doc",
        margin: "5px 0 0 0",
        color: "white",
        border: "none",
        bgColor: "#888",
        fontSize: "small",
        fontWeight: "bold",
        padding: "10px 15px",
        borderRadius: "5px",
        hoverColor: "black",
        hoverBorder: "none",
        hoverBgColor: "white"
    }

    const buttonStyleContentNewOld = {
        buttonText: dateButtonText,
        color: "#888",
        margin: "20px 5px",
        bgColor: "black",
        fontSize: "small",
        borderRadius: "5px",
        padding: "15px 20px",
        fontWeight: "normal",
        border: "1px solid #333",
        hoverColor: "white",
        hoverBgColor: "none",
        hoverBorder: "1px solid white"
    }

    const buttonStyleContentBack = {
        buttonText: "Back",
        margin: "0px",
        color: "white",
        border: "none",
        bgColor: "#888",
        fontSize: "small",
        fontWeight: "bold",
        padding: "8px 20px",
        borderRadius: "5px",
        hoverColor: "black",
        hoverBorder: "none",
        hoverBgColor: "white"
    }

    const buttonStyleContentEdit = {
        buttonText: "Download",
        margin: "0px",
        color: "white",
        border: "none",
        bgColor: "#888",
        fontSize: "small",
        fontWeight: "bold",
        padding: "8px 13px",
        borderRadius: "5px",
        hoverColor: "black",
        hoverBorder: "none",
        hoverBgColor: "white"
    }

    useEffect(() => {
        if(!session) {
            window.location.href = "/";
        }
        else {
            const tempData = JSON.parse(sessionStorage.getItem("data"));
            axios.get("/api/getCardImages")
                .then((response) => {
                    tempData.map((item, index) => {
                        item.cardImage = response.data.result[index%response.data.result.length].imageUrl;
                    })
                    setData(sort(tempData));
                })
        }
    }, [])

    const handlePreview = (fileUrl) => {
        setFileUrl(fileUrl);
        setShowPreview(true);
    }

    const handleSearchInput = (search) => {
        if(!search.length) {
            setSearchData(true);
            setData(JSON.parse(sessionStorage.getItem("data")));
            const tempData = JSON.parse(sessionStorage.getItem("data"))
            axios.get("/api/getCardImages")
            .then((response) => {
                tempData.map((item, index) => {
                    item.cardImage = response.data.result[index%response.data.result.length].imageUrl;
                })
                setData(sort(tempData));
            });
            setDateButtonText("NEW TO OLD");
        }
        else {
            let searchResult = [];
            searchResult = data.filter(item => item.type.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase()));
            if(!searchResult.length) {
                setSearchData(false);
            }
            else {
                setSearchData(true);
                setData(searchResult);
            }
        }
    }

    const handleDateData = () => {
        if(dateButtonText == "NEW TO OLD") {
            setDateButtonText("OLD TO NEW");
            setData(sort(data, false));
        }
        else {
            setDateButtonText("NEW TO OLD");
            setData(sort(data));
        }
    }

    const sort = (data, newToOld = true) => {
        for (let i=0; i<data.length - 1; i++) {
            for(let j=i; j<data.length; j++) {
                if(!newToOld? moment(data[i].updatedOnDate).isAfter(moment(data[j].updatedOnDate)): moment(data[i].updatedOnDate).isBefore(moment(data[j].updatedOnDate))) {
                    let temp = data[i];
                    data[i] = data[j];
                    data[j] = temp;
                }
            }
        }
        return data;
    }

    const naviagteToEditDoc = (data) => {
        router.push({
            pathname: '/operation/editDoc',
            query: {docData: JSON.stringify(data),
                    handleDoc: "Edit Doc",
                    editDocStyle: "row-reverse"
            },
        }, "/operation/editDoc");
    }

    const navigateToAddDoc = () => {
        router.push({
            pathname: "/operation/addDoc",
            query: {docData: JSON.stringify([]),
                    handleDoc: "Add Doc"}
        }, "/operation/addDoc");
    }

    return (
        <div className={landingLayoutStyle.landingParent}>
            <p style={{color: "#777", textAlign: "center", margin: "0"}}>We recommend you to Sign Out after you're done.</p>
            {
                !data.length?
                    <div className={landingLayoutStyle.noDataContainer}>
                        <p style={{color: "#888", fontSize: "small", textAlign: "center", lineHeight: "1.2"}}>Looks like you didn't add any documents yet.<br/><span style={{color: "white", fontSize: "xx-large"}}>Why don't we start now.</span></p>
                        <ButtonLayout buttonStyle={buttonStyleContent} handleButtonClick={navigateToAddDoc}/>
                    </div>:
                    searchData?
                        <div className={landingLayoutStyle.dataContainer}>
                            <div className={landingLayoutStyle.searchBar}>
                                <InputLayout placeholder="Search with doc category or type..." width="45%" getData={handleSearchInput} />
                                <ButtonLayout buttonStyle={buttonStyleContentNewOld} handleButtonClick={handleDateData}/>
                            </div>
                            <div className={landingLayoutStyle.docData}>
                                {
                                    data.map((item, index) => {
                                        return (
                                            <CardLayout key={index} data={item} sendData={naviagteToEditDoc} getDocFile={handlePreview} />
                                        )
                                    })
                                }
                            </div>
                        </div>:
                        <div className={landingLayoutStyle.dataContainer}>
                            <div className={landingLayoutStyle.searchBar}>
                                <InputLayout placeholder="Search with doc type..." width="45%" getData={handleSearchInput} />
                                <ButtonLayout buttonStyle={buttonStyleContentNewOld} handleButtonClick={handleDateData}/>
                            </div>
                            <div style={{marginTop: "25vh"}}>
                                <p style={{color: "white", fontSize: "x-large", textAlign: "center", lineHeight: "1.2"}}>Sorry, no results found.</p>
                            </div>
                        </div>
            }
            {
                showPreview && 
                    <div className={landingLayoutStyle.docPreviewParent}>
                        {fileUrl.includes("pdf")?
                            <iframe className={landingLayoutStyle.docPreview} src={`${fileUrl}#view=fitV`}></iframe>:
                            <img src={fileUrl} className={landingLayoutStyle.docPreview} style={{width: "auto", maxWidth: "90%"}} />
                        }
                        <div className={landingLayoutStyle.docPreviewButtons}>
                            <ButtonLayout buttonStyle={buttonStyleContentBack}  handleButtonClick={() => {setShowPreview(false)}}/>
                            <ButtonLayout buttonStyle={buttonStyleContentEdit} handleButtonClick={() => {window.location.href = fileUrl}}/>
                        </div>
                    </div>
            }
        </div>
    );
}

export default LandingLayout;