const ReviewImageFullScreen = ({ handleReviewImageClick, selectedImage }) => {

  return (
    <div className="image-full-screen">
      <img src={selectedImage} alt='image' />
      <h1 onClick={handleReviewImageClick}>x</h1>
    </div>
  )
}

export default ReviewImageFullScreen