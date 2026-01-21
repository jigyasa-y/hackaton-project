import React, { useState } from "react";
import { useNavigate } from "react-router";


const Clientonbording=()=>{
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    password: '',
    accountType: '',
    lookingFor: '',
    budgetTimeline: '',
    communicationPreference: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    // Save data to localStorage as backup
    localStorage.setItem('clientOnboardingData', JSON.stringify(formData));
    // Navigate to review page with form data
    navigate('/clientreview', { state: { formData } });
  };

  return(
    <>
    <div className="flex flex-col justify-center  items-center  bg-white  ">
<h className="text-3xl text-black p-4">Client onboarding</h>
<div className=" flex  flex-col gap-8  rounded">
<div className="flex flex-col justify-center items-center gap-12 p-4 bg-blue-300 rounded-xl">

  <h1 className="text-3xl text-center">Account Information</h1>
  <input 
    type="text" 
    name="fullName"
    placeholder="Full Name" 
    className="w-200  h-15 pl-7 text-xl rounded bg-white"
    value={formData.fullName}
    onChange={handleInputChange}
  />
   <input 
    type="tel" 
    name="mobile"
    placeholder="Mobile" 
    className="w-200  h-15 pl-7 text-xl rounded bg-white"
    value={formData.mobile}
    onChange={handleInputChange}
  />
    <input 
    type="password" 
    name="password"
    placeholder="Password" 
    className="w-200  h-15 pl-7 text-xl rounded bg-white"
    value={formData.password}
    onChange={handleInputChange}
  />



<div className="relative">

 <select
    className="peer w-200 p-3  rounded-lg bg-white"
    name="accountType"
    value={formData.accountType}
    onChange={handleInputChange}
  >
    <option value="" disabled>
      Account type
    </option>
    <option value="individual">individual</option>
    <option value="Startup">Startup</option>
    <option value="small Business">Small Business</option>
  </select>

</div>

<div className="relative">
  <select 
    className="peer w-200 p-3 rounded-lg bg-white"
    name="lookingFor"
    value={formData.lookingFor}
    onChange={handleInputChange}
  >
    <option value=""disabled>What Are you Looking For</option>
    <option value="Web Development">Web Development</option>
     <option value="Design">Design</option>
      <option value="Video Editing">Video Editing</option>
       <option value="Content Writing">Content  Writting</option>
        <option value="Marketing">Markating</option>
         <option value="project category">project category</option>
          <option value="paid">paid</option>
           <option value="Learning/unpaid">Learning/unpaid</option>



  </select>


</div>

<div className="relative">
  <select 
    className="peer w-200 p-3 bg-white rounded-lg" 
    name="budgetTimeline"
    value={formData.budgetTimeline}
    onChange={handleInputChange}
  >
    <option value=""disabled>Budget & Timeline</option>
    <option value="Fixed amount">Fixed amount OR</option>
    <option value="Range (500-5000)">Range (500-5000)</option>
 <option value="Timeline">Timeline</option>

 <option value="1-3 days">1-3 days</option>

 <option value="1 week">1 week</option>



 <option value="2+week">2+week</option>




  </select>


</div>
<div className="relative">
  <select 
    className="peer w-200 p-3 bg-white rounded-lg"
    name="communicationPreference"
    value={formData.communicationPreference}
    onChange={handleInputChange}
  >

    <option value=""disabled>Communication preference</option>
    <option value="Chat inside platform">Chat inside platform</option>
    <option value="Email updates">Email updates</option>
</select>


</div>


</div>
    
    
    </div>
    
    
    
    
    <button 
      type="button" 
      onClick={handleNext}
      className="bg-blue-500 text-center p-3 w-40 text-xl mt-5 rounded-2xl hover:bg-gray-700 text-white"
    >
      Next
    </button>
    </div>

    </>
 )
  
}

export default Clientonbording;
