import { GifForm } from './GifForm';

export const AddGifModal = ({ onClose }) => {
  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 m-auto z-50 h-screen w-screen flex items-center justify-center backdrop-blur-sm'>
      <div className='h-1/2 w-1/2 bg-white '>
        <h5 className='modal-title'>Add Gif</h5>
        <button
          type='button'
          className='close'
          data-dismiss='modal'
          aria-label='Close'
          onClick={onClose}
        >
          Close
        </button>

        <div className='modal-body'>
          <GifForm onClose={onClose} />
        </div>
      </div>
    </div>
  );
};
