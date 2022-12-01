import './Heading.css';

export default function Heading(props) {
  return (
    <h2 className='heading' id={props.id || ''}>
      {props.text}
    </h2>
  );
}
