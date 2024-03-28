import './styles.css';

function TextField(props) {
  return (
    <div class="text-field" style={{ width: props.width }}>
      <fieldset>
        <input type="text" id={props.id} name={props.id} placeholder={props.placeholder} required />
        <legend>
          <span>{props.placeholder}</span>
        </legend>
        <label for={props.id} class="placeholder">{props.placeholder}</label>
      </fieldset>
    </div>
  )
}

export default TextField