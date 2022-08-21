import axios from "axios";
import Image from "next/image";
import generateUrl from "../../lib/s3";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IoCloudDone } from 'react-icons/io5';
import { IoCloudUploadSharp } from 'react-icons/io5';
import InputLayout from "../inputLayout/inputLayout";
import ButtonLayout from "../buttonLayout/buttonLayout";
import addDocLayoutStyle from "./addDocLayout.module.css";
import inputLayoutStyle from '../inputLayout/inputLayout.module.css';

const AddDocLayout = (props) => {
    const {data: session} = useSession();
    const router = useRouter();
    const [docTypes, setDocTypes] = useState([]);
    const [handleDoc, setHandleDoc] = useState("");

    const [doc, setDoc] = useState({
        docFile: {},
        docType: "",
        docCategory: "",
        docDescription: ""
    });

    const [options, setOptions] = useState({
        typeOptions: false,
        categoryOptions: false
    });

    const [errors, setErrors] = useState({
        dataError: false,
        fieldError: false
    });

    const [inputText, setInputText] = useState({
        fileInputText: "",
        addButtonText: "Add Doc",
        editButtonText: "Edit Doc",
        deleteButtonText: "Delete Doc"
    })

    const buttonStyleContent = {
        buttonText: inputText.addButtonText,
        color: "white",
        border: "none",
        bgColor: "#222",
        fontSize: "small",
        fontWeight: "bold",
        borderRadius: "5px",
        margin: "10px 0 0 0",
        padding: "10px 15px",
        hoverBorder: "none",
        hoverColor: "black",
        hoverBgColor: "white"
    }

    const editButtonStyleContent = {
        buttonText: inputText.editButtonText,
        color: "white",
        border: "none",
        bgColor: "#222",
        fontSize: "small",
        fontWeight: "bold",
        borderRadius: "5px",
        margin: "10px 0 0 0",
        padding: "10px 20px",
        hoverBorder: "none",
        hoverColor: "black",
        hoverBgColor: "white"
    };

    const deleteButtonStyleContent = {
        buttonText: inputText.deleteButtonText,
        color: "white",
        border: "none",
        bgColor: "#222",
        fontSize: "small",
        fontWeight: "bold",
        borderRadius: "5px",
        margin: "10px 0 0 0",
        padding: "10px 15px",
        hoverBorder: "none",
        hoverColor: "white",
        hoverBgColor: "red"
    };

    useEffect(() => {
        if(!session) {
            window.location.href="/signIn";
        }
        else {
            if(props.handleDoc == "Add Doc"){
                setHandleDoc("Add Doc");
                setDoc({
                    ...doc,
                    docCategory: "Enter Doc Category*",
                    docType: "Enter Doc Type*",
                    docDescription: "Enter Doc Description"
                });
                setInputText({
                    ...inputText,
                    fileInputText: "Drop Your File Here*"
                });
            }
            else {
                setHandleDoc("Edit Doc");
                setDoc({
                    ...doc,
                    docType: props.data.type,
                    docCategory: props.data.category,
                    docDescription: props.data.description
                });
                setInputText({
                    ...inputText,
                    fileInputText: "Already Added"
                });
            }
        }
    }, []);
    
    const openDocCategoryOptions = () => {
        setErrors({
            ...errors,
            fieldError: false
        });
        setOptions({
            ...options,
            typeOptions: false,
            categoryOptions: !options.categoryOptions,
        });
    }
    
    const handleDocCategoryField = (e) => {
        let flag = false;
        setOptions({
            ...options,
            categoryOptions: false
        });
        setDoc({
            ...doc,
            docCategory: e.target.innerHTML,
            docType: "Enter Doc Type*",
        });
        for(let item of props.inputData) {
            if(e.target.innerHTML == item.docCategory) {
                setDocTypes(item.docTypes);
                flag = true;
            }
        }
        if(!flag) {
            setDocTypes(["Other"]);
            setDoc({
                ...doc,
                docCategory: e.target.innerHTML,
                docType: "Enter Doc Type*",
            });
        }
    }

    const openDocTypeOptions = () => {
        setErrors({
            ...errors,
            fieldError: false
        });
        setOptions({
            categoryOptions: false,
            typeOptions: !options.typeOptions
        });
    }

    const handleDocInputTypeField = (getDocType) => {
        if(getDocType.length == 0) {
            setDoc({
                ...doc,
                docType: "Enter Doc Type*"
            });
            setErrors({
                ...errors,
                fieldError: true,
            })
        }
        else {
            setDoc({
                ...doc,
                docType: getDocType
            });
            setOptions({
                typeOptions: false
            });
            setErrors({
                ...errors,
                fieldError: false,
            })
        }
    }

    const handleDocTypeField = (e) => {
        setDoc({
            ...doc,
            docType: e.target.innerHTML
        });
        setOptions({
            typeOptions: false
        });
    }

    const handleDocDescription = (e) => {
        setErrors({
            ...errors,
            fieldError: false
        });
        setOptions({
            ...options,
            typeOptions: false,
            categoryOptions: false
        });
        setDoc({
            ...doc,
            docDescription: e.target.value
        });
        if(doc.docDescription == "Enter Doc Description" || e.target.value.length == 0) {
            setDoc({
                ...doc,
                docDescription: "Not Added."
            })
        }
    }

    const handleDocFile = (e) => {
        if(!e.target.files[0]) {
            return;
        }
        else {
            const fileType = e.target.files[0].type.split("/")[1];
            if(fileType == "png" || fileType == "jpg" || fileType == "jpeg" || fileType == "pdf") {
                setErrors({
                    ...errors,
                    fieldError: false
                });
                setDoc({
                    ...doc,
                    docFile: e.target.files[0]
                });
                if(inputText.fileInputText == "Drop Your File Here*") {
                    setInputText({
                        ...inputText,
                        fileInputText: "Added"
                    });
                }
                else {
                    setInputText({
                        ...inputText,
                        fileInputText: "New Added"
                    });
                }
            }
            else {
                setErrors({
                    ...errors,
                    fieldError: true
                });
            }
        }
    }

    const addData = async () => {
        if(doc.docCategorydocCategory == "Enter Doc Category*" || doc.docType == "Enter Doc Type*" || !doc.docType || !doc.docFile.name || errors.fieldError) {
            setErrors({
                ...errors,
                fieldError: true
            });
        }
        else {
            setInputText({
                ...inputText,
                fileInputText: "File Uploading...",
            });
            try {
                let uploadedFileUrl = await handleS3();
                setInputText({
                    ...inputText,
                    fileInputText: "File Uploaded",
                    addButtonText: "Adding Doc..."
                });

                const body = [
                    sessionStorage.getItem("username"),
                    handleDoc,
                    {
                        category: doc.docCategory,
                        type: doc.docType,
                        description: doc.docDescription == "Enter Doc Description"?"Not Added.":doc.docDescription,
                        uploadedOnDate: new Date(),
                        updatedOnDate: new Date(),
                        file: uploadedFileUrl,
                    }
                ];
                axios.post("/api/addDocData", body)
                    .then((response) => {
                        if(response.data.result == "DataNotAdded") {
                            setErrors({
                                ...errors,
                                dataError: true
                            });
                        }
                        else {
                            sessionStorage.setItem("data", JSON.stringify(response.data.result));
                            router.push('/');
                        }
                    })
                setErrors({
                    ...errors,
                    fieldError: false
                });
            }
            catch(error) {
                setInputText({
                    ...inputText,
                    fileInputText: "File Not Uploaded",
                });
                console.log(error);
            }
        }
    }

    const deleteData = () => {
        try {
            setInputText({
                ...inputText,
                deleteButtonText: "Deleting Doc"
            });
            const body = [
                sessionStorage.getItem("username"),
                "Delete Doc",
                props.data.uploadedOnDate
            ];
            axios.post("/api/addDocData", body)
                .then((response) => {
                    if(response.data.result == "DataNotAdded") {
                        setErrors({
                            ...errors,
                            dataError: true
                        });
                    }
                    else {
                        sessionStorage.setItem("data", JSON.stringify(response.data.result));
                        router.push("/");
                    }
                })
            setErrors({
                ...errors,
                fieldError: false
            });
        }
        catch(error) {
            setErrors({
                ...errors,
                dataError: true
            })
            console.log(error);
        }
    }

    const editData = async () => {
        let uploadedFile = props.data.file;
        if(errors.fieldError) {}
        else if(doc.docType != props.data.type  || doc.docDescription != props.data.description || inputText.fileInputText == "New Added") {
            try {
                setInputText({
                    ...inputText,
                    editButtonText: "Editing Doc"
                });
                if(inputText.fileInputText == "New Added") {
                    setInputText({
                        ...inputText,
                        fileButtonText: "File Uploading..."
                    });
                    uploadedFile = await handleS3();
                }
                setInputText({
                    ...inputText,
                    fileButtonText: "File Uploaded"
                });
                const body = [
                    sessionStorage.getItem("username"),
                    handleDoc,
                    {   
                        category: doc.docCategory,
                        type: doc.docType,
                        description: doc.docDescription,
                        uploadedOnDate: props.data.uploadedOnDate,
                        updatedOnDate: new Date(),
                        file: uploadedFile,
                    },
                    props.data.uploadedOnDate
                ];
                axios.post("/api/addDocData", body)
                        .then((response) => {
                            if(response.data.result == "DataNotAdded") {
                                setErrors({
                                    ...errors,
                                    dataError: true
                                });
                            }
                            else {
                                sessionStorage.setItem("data", JSON.stringify(response.data.result));
                                router.push("/");
                            }
                        })
                    setErrors({
                        ...errors,
                        fieldError: false
                    });
            }
            catch(error) {
                setErrors({
                    ...errors,
                    dataError: true
                })
                console.log(error);
            }
        }
        else {
            window.location.href = "/";
        }
    }

    const handleS3 = async () => {
        const username = sessionStorage.getItem("username");
        const url = await generateUrl(`${doc.docCategory}_${doc.docType}_${doc.docFile.name}`, username.split("@")[0], doc.docFile.type);
        await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': doc.docFile.type
            },
            body: doc.docFile
        });
        let uploadedFile = url.split("?")[0];
        return uploadedFile;
    }

    return (
        <div className={addDocLayoutStyle.addParent} style={{flexDirection: router.query.editDocStyle}}>
            <div className={addDocLayoutStyle.leftContainer}>
                <div className={addDocLayoutStyle.addDoc}>
                    {handleDoc == "Add Doc"?<p className={addDocLayoutStyle.title}>Add Doc</p>:<p className={addDocLayoutStyle.title}>Edit Doc</p>}
                    <div className={addDocLayoutStyle.category}>
                        <div className={inputLayoutStyle.inputField} onClick={openDocCategoryOptions}>
                            <div>
                                {doc.docCategory == "Enter Doc Category*"?<p className={addDocLayoutStyle.selectInputText}>{doc.docCategory}</p>:<p style={{color: "white"}} className={addDocLayoutStyle.selectInputText}>{doc.docCategory}</p>}
                            </div>
                            {options.categoryOptions && handleDoc == "Add Doc" &&
                                <div className={addDocLayoutStyle.selectInputOptionsParent}>
                                    {
                                        props.inputData.sort((a,b) => a.docCategory.length - b.docCategory.length).map((item, index) => {
                                            return (
                                                <p key={index} className={addDocLayoutStyle.selectInputOptions} onClick={handleDocCategoryField}>{item.docCategory}</p>
                                            );
                                        })
                                    }
                                    <p className={addDocLayoutStyle.selectInputOptions} onClick={handleDocCategoryField}>Other</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={addDocLayoutStyle.category}>
                        {doc.docCategory == "Other"?
                            <div className={addDocLayoutStyle.selectInputType}>
                                {
                                    handleDoc == "Add Doc"?
                                        <InputLayout placeholder={doc.docType} getData={handleDocInputTypeField} />:
                                        <InputLayout placeholder="Enter Doc Type*" value={doc.docType!="Enter Doc Type*"?doc.docType:""} getData={handleDocInputTypeField} />
                                }
                            </div>:
                            <div className={inputLayoutStyle.inputField} onClick={openDocTypeOptions}>
                                <div>
                                {doc.docType == "Enter Doc Type*"?<p className={addDocLayoutStyle.selectInputText}>{doc.docType}</p>:<p style={{color: "white"}} className={addDocLayoutStyle.selectInputText}>{doc.docType}</p>}
                                </div>
                                {options.typeOptions && handleDoc == "Add Doc" &&
                                    <div className={addDocLayoutStyle.selectInputOptionsParent}>
                                        {
                                            docTypes.sort((a,b) => a.length - b.length).map((item, index) => {
                                                return (
                                                    <p key={index} className={addDocLayoutStyle.selectInputOptions} onClick={handleDocTypeField}>{item}</p>
                                                );
                                            })
                                        }
                                 </div>
                                }
                            </div>
                    }
                    </div>
                    {handleDoc == "Add Doc"?<textarea className={inputLayoutStyle.inputField} placeholder={doc.docDescription} onChange={handleDocDescription}/>:<textarea className={addDocLayoutStyle.inputField} placeholder={doc.docDescription} defaultValue={doc.docDescription} onChange={handleDocDescription} />}
                    <div className={addDocLayoutStyle.fileInputContainer}>
                        <div className={addDocLayoutStyle.fileInput}>
                            <input type="file" id="fileUpload" style={{display: "none"}} onChange={handleDocFile}/>
                            <label htmlFor="fileUpload" className={addDocLayoutStyle.fileInputLabel}>
                                {inputText.fileInputText == "File Uploaded"?<IoCloudDone style={{color: "white"}} className={addDocLayoutStyle.uploadIcon} />:<IoCloudUploadSharp className={addDocLayoutStyle.uploadIcon} />}
                                {inputText.fileInputText == "Drop Your File Here*"?<p className={addDocLayoutStyle.uploadText}>{inputText.fileInputText}</p>:<p style={{color: "white"}} className={addDocLayoutStyle.uploadText}>{inputText.fileInputText}</p>}
                            </label>
                        </div>
                        <p className={addDocLayoutStyle.fileTypesText}>Please upload only png, jpg, jpeg or pdf.</p>
                    </div>
                    {errors.fieldError && <p style={{color: "red", fontSize: "small", margin: "15px 0"}}>Fields can&apos;t be empty</p>}
                    {handleDoc == "Add Doc"?
                        <ButtonLayout buttonStyle={buttonStyleContent} handleButtonClick={addData} />:
                        <div className={addDocLayoutStyle.buttons}>
                            <ButtonLayout buttonStyle={deleteButtonStyleContent} handleButtonClick={deleteData} />
                            <ButtonLayout buttonStyle={editButtonStyleContent} handleButtonClick={editData} />
                        </div>
                    }
                    {errors.dataError && <p style={{color: "red", fontSize: "small", margin: "15px 0", textAlign: "center"}}>Something went wrong. Please try again</p>}
                </div>
            </div>
            <div className={addDocLayoutStyle.rightContainer}>
                {handleDoc == "Add Doc"?
                    <Image
                        src="/static/images/addDoc.svg"
                        alt="Sign Up Image"
                        width={500}
                        height={500}
                    />:
                    <Image
                        src="/static/images/editDoc.svg"
                        alt="Sign Up Image"
                        width={500}
                        height={500}
                    />
                }
            </div>
        </div>
    );
}

export default AddDocLayout;