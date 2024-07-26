import { useState } from 'react';

function ErrorText( {show, text} ) {

  if (show){
    return (
      <div className="error-text">       
        {text}
      </div> 
    );
  } else {
    return (<></>);
  }
}

export default ErrorText;