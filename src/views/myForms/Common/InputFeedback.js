export default function InputFeedback({ size, message }) {
    // const css = `text-danger`
    return (<p
        // className={css}
        style={{
            fontSize: size ? '0.9rem' : 'small',
            color: 'red'
        }}
      >
        {message}
      </p>)
}