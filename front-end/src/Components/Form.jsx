// // Form.js
// import { MDBBtn, MDBContainer, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
// import {
//   MDBDropdown,
//   MDBDropdownMenu,
//   MDBDropdownToggle,
//   MDBDropdownItem,
// } from "mdb-react-ui-kit";

// import React, { useState } from "react";

// const Form = ({ onFormDataSubmit }) => {
//   const [title, setTitle] = useState("");
//   const [text, setText] = useState("");

//   const token = localStorage.getItem("token");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = { title, text, token };
//     onFormDataSubmit(data);
//   };

//   // console.log(notes);

//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-lg-6 col-md-8 col-sm-12">
//           <h5 className="mb-3">Add your Note</h5>
//           <form onSubmit={handleSubmit}>
//             <MDBDropdown className="mb-3 mt-3" animation={false}>
//               <MDBDropdownToggle>Note Type</MDBDropdownToggle>
//               <MDBDropdownMenu>
//                 <MDBDropdownItem link>Action</MDBDropdownItem>
//                 <MDBDropdownItem link>Another action</MDBDropdownItem>
//                 <MDBDropdownItem link>Something else here</MDBDropdownItem>
//               </MDBDropdownMenu>
//             </MDBDropdown>
//             <MDBContainer className="mb-3">
//               {/* <label htmlFor="inputField1" className="form-label">
//                 Input Field 1
//               </label> */}
//               <MDBInput
//                 onChange={(e) => setTitle(e.target.value)}
//                 label="Note Title"
//                 id="typeText"
//                 type="text"
//               />
//             </MDBContainer>

//             <MDBContainer className="mb-3">
//               {/* <label htmlFor="inputField2" className="form-label">
//                 Input Field 2
//               </label> */}
//               <MDBTextArea
//                 onChange={(e) => setText(e.target.value)}
//                 label="Message"
//                 id="textAreaExample"
//                 rows={4}
//               />
//             </MDBContainer>

//             <MDBBtn type="submit" className="btn btn-primary">
//               Submit
//             </MDBBtn>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Form;
