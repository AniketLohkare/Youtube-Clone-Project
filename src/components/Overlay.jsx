const Overlay = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className='fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity dark:bg-black/60'
    />
  )
}

export default Overlay
