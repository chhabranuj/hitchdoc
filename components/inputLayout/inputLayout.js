import inputLayoutStyle from './inputLayout.module.css';

const InputLayout = (props) => {

    const getInput = (e) => {
        props.getData(e.target.value);
    }

    return(
        <input className={inputLayoutStyle.inputField}
            placeholder={props.placeholder}
            type={props.type}
            onChange={getInput}
            style={{width: props.width}}
        />
    );
}

export default InputLayout;