import './styles.css';

function TextField(props) {
  return (
    <div className={"text-field " + (props.big ? "big" : "")} style={{ width: props.width }}>
      <fieldset>
        <input
          required
          type="text"
          id={props.id}
          name={props.id}
          placeholder={props.placeholder}
          style={{ width: props.width }}
          onChange={!!props.onChange ? props.onChange : (() => { })}
        />
        <legend>
          <span>{props.placeholder}</span>
        </legend>
        <label htmlFor={props.id} className="placeholder">{props.placeholder}</label>
      </fieldset>
    </div>
  )
}

export default TextField