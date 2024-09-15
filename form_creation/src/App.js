// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [apiToken, setApiToken] = useState('');
//   const [redirectFormUrl, setRedirectFormUrl] = useState('');
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   // Handle API token input
//   const handleTokenChange = (e) => {
//     setApiToken(e.target.value);
//   };

//   // Handle API token submission
//   const handleTokenSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send API token to backend
//       await axios.post('http://localhost:5000/set-api-token', { apiToken });

//       // Redirect to the forms.app form URL after submitting the token
//       setRedirectFormUrl('https://vpi46ru4.forms.app/untitled-form'); // Replace with the actual forms.app form URL
//     } catch (error) {
//       console.error('Error setting API token:', error);
//     }
//   };

//   // Handle form submission (from forms.app) redirect
//   const handleFormSubmit = () => {
//     setFormSubmitted(true);
//   };

//   // Redirect to 123FormBuilder login page
//   const redirectTo123FormBuilder = () => {
//     window.location.href = 'https://app.123formbuilder.com/index.php?p=login';
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {!redirectFormUrl && !formSubmitted && (
//         <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-md shadow-md">
//           <h1 className="text-white text-2xl mb-4">Enter your API Token</h1>
//           <form onSubmit={handleTokenSubmit}>
//             <input
//               type="text"
//               placeholder="123FormBuilder API Token"
//               value={apiToken}
//               onChange={handleTokenChange}
//               className="w-full p-2 mb-4 border rounded-md"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white p-2 rounded-md"
//             >
//               Submit API Token
//             </button>
//           </form>
//         </div>
//       )}

//       {/* After API token submission, redirect to forms.app form */}
//       {redirectFormUrl && !formSubmitted && (
//         <div className="text-center mt-10">
//           <h2 className="text-white">Redirecting to form...</h2>
//           <a
//             href={redirectFormUrl}
//             className="text-blue-500 underline"
//             onClick={handleFormSubmit}
//           >
//             Go to Form
//           </a>
//         </div>
//       )}

//       {/* After form submission, show button to go to 123FormBuilder */}
//       {formSubmitted && (
//         <div className="text-center mt-10">
//           <button
//             className="bg-green-500 text-white p-4 rounded-md"
//             onClick={redirectTo123FormBuilder}
//           >
//             Go to 123FormBuilder
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Assuming your CSS is saved here

function App() {
  const [apiToken, setApiToken] = useState('');
  const [redirectFormUrl, setRedirectFormUrl] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTokenChange = (e) => {
    setApiToken(e.target.value);
  };

  const handleTokenSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/set-api-token', { apiToken });
      setRedirectFormUrl('https://vpi46ru4.forms.app/untitled-form'); // Replace with actual URL
    } catch (error) {
      console.error('Error setting API token:', error);
    }
  };

  const handleFormSubmit = () => {
    setFormSubmitted(true);
  };

  const redirectTo123FormBuilder = () => {
    window.location.href = 'https://app.123formbuilder.com/index.php?p=login';
  };

  return (
    <div className="container">
      {!redirectFormUrl && !formSubmitted && (
        <div className="card">
          <h1>Enter your API Token</h1>
          <form onSubmit={handleTokenSubmit}>
            <input
              type="text"
              placeholder="123FormBuilder API Token"
              value={apiToken}
              onChange={handleTokenChange}
              required
            />
            <button type="submit">Submit API Token</button>
          </form>
        </div>
      )}

      {redirectFormUrl && !formSubmitted && (
        <div className="card">
          <h2>Redirecting to form...</h2>
          <a
            href={redirectFormUrl}
            className="link-button"
            onClick={handleFormSubmit}
          >
            Go to Form
          </a>
        </div>
      )}

    </div>
  );
}

export default App;
