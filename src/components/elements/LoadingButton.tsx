const LoadingButton = () => {
    return <div className="fixed inset-0 flex  items-center justify-center z-50 bg-black bg-opacity-50">
    <style>
      {`.loader {
    width: 12rem;
    height: 12rem;
    border: 8px solid #FFF;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  .loader::after {
    content: '';  
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 13rem;
    height: 13rem;
    border-radius: 50%;
    border: 8px solid;
    border-color: rgb(91 33 182) transparent;
  }
  
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } `}  
    </style>
    <div className="loader absolute inset-0">
    </div>
    <div className="absolute inset-0 flex flex-col items-center justify-center font-bold text-4xl text-indigo-700">
        <div className="flex items-center">
            <div className="animate-pulse mr-1">I</div>
            <div className="animate-pulse mr-1">S</div>
            <div className="animate-pulse mr-1">A</div>
        </div>
        <div className="flex items-center">
            <div className="animate-pulse ">G</div>
            <div className="animate-pulse ">A</div>
            <div className="animate-pulse ">N</div>
            <div className="animate-pulse ">T</div>
            <div className="animate-pulse ">N</div>
            <div className="animate-pulse ">G</div>
        </div>
      </div>
</div>
}

export default LoadingButton