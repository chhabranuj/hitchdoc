const ButtonLayout = (props) => {

    const handleNavigation = () => {
        props.handleButtonClick()
    }

    return (
        <button className="button" onClick={handleNavigation}>
            {props.buttonIcon}
            {props.buttonStyle.buttonText}
            <style jsx>{`
                .button {
                    outline: none;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: ${props.buttonStyle.color};
                    margin: ${props.buttonStyle.margin};
                    background-color: ${props.buttonStyle.bgColor};
                    font-size: ${props.buttonStyle.fontSize};
                    padding: ${props.buttonStyle.padding};
                    border: ${props.buttonStyle.border};
                    border-radius: ${props.buttonStyle.borderRadius};
                    font-weight: ${props.buttonStyle.fontWeight};
                }

                .button:hover {
                    color: ${props.buttonStyle.hoverColor};
                    background-color: ${props.buttonStyle.hoverBgColor};
                    border: ${props.buttonStyle.hoverBorder};
                }
            `}</style>
        </button>
    );
}

export default ButtonLayout;