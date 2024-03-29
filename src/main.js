const student_create_form=document.getElementById("student-create-form");
const student_create_modal=document.getElementById("student-create");
const student_update_form = document.getElementById("student-update-form");
const student_update_btn = document.getElementById("student-update-btn");
const studentList=document.getElementById("student-data-list");
const mgs=document.querySelector(".mgs");
const singleStudentData=document.querySelector(".student-data");

//student data show

const getAllStudents=()=>{
  const students=getDataLs("students");

  let dataList="";

  if(students){
    students.forEach((item,index)=>{
      //const {name,email,phone,location,photo,createdAt}=item;
      dataList+=`<tr>
      <td>${index+1}</td>
      <td><img src="${item.photo}" alt=""></td>
      <td>${item.name}</td>
      <td>${item.email}</td>
      <td>${item.phone}</td>
      <td>${item.location}</td>
      <td>${timeJust(item.createdAt)}</td>
     
      <td>
          <button class="btn btn-sm btn-info" data-bs-toggle="modal"
           data-bs-target="#student-show"
           onclick="showSingleStudent('${item.id}')"
           >
           <i class="fa fa-eye"></i></button>
          <button data-bs-toggle="modal" data-bs-target="#student-update"
          onclick="modalEdit('${item.id}')" class="btn btn-sm btn-warning"><i class="fa fa-edit"></i></button>
          <button class="btn btn-sm btn-danger" onclick="deleteStudent('${item.id}')">
          <i class="fa-regular fa-trash-can"></i></button>
      </td>
     
  </tr>`;
    
  });
}
  else{
    dataList=`
    <tr>
      <td colspan="7" class="text-center text-danger" ><b>No Data Found</b></td>
    </tr>
    `;
  }
  studentList.innerHTML=dataList;
  };

  getAllStudents();

//Student single data show

const showSingleStudent=(id)=>{
  const {name, email, phone,location, photo}=getSingleData("students",id);

  singleStudentData.innerHTML=`
  <img src="${photo}" alt="">
  <h2>${name}</h2>
  <p>${location}</p>`;
}


//delete single student data

const deleteStudent=(id)=>{
  const conf =confirm('Are You Sure!');
  if(conf){
    deleteSingleData('students', id);
    getAllStudents();
  }
  
}

//now student create submit form

student_create_form.onsubmit = (e) => {
  e.preventDefault();

  //get form data

  const form_data= new FormData(e.target);
  const {name,email,phone,location,photo}=Object.fromEntries(form_data);
  if(!name || !email || !phone || !location || !photo){
   mgs.innerHTML=createAlert('All fields are required');  
}
else if(!isEmail(email))
{
mgs.innerHTML=createAlert('Invalid Email', 'warning');
}
else if(!isMobile(phone)){
  mgs.innerHTML=createAlert('Invalid Mobile NUmber','warning');
}
else{
  sendDataLs('students', {
    id:createID(),
    name:name,
    email:email,
    phone:phone,
    location:location,
    photo:photo,
    createdAt: Date.now(),
   
   
  }); //key and name same hole ekta name rakhley hobe jmn, name,email,phone,location,photo

  mgs.innerHTML=createAlert('Student Data Created Successfully!','success');
  e.target.reset();
  getAllStudents();


}
}

//modal edit post

const modalEdit =(id)=>{
  
  const students=getDataLs("students");

  //get edit 

  const {name,email,phone,location,photo}=students.find((data)=>data.id == id);

  student_update_form.querySelector('input[placeholder="Name"]').value=name;
  student_update_form.querySelector('input[placeholder="Email"]').value=email;
  student_update_form.querySelector('input[placeholder="Phone"]').value=phone;
  student_update_form.querySelector('input[placeholder="Location"]').value=location;
  student_update_form.querySelector('input[placeholder="Photo"]').value=photo;
  student_update_form.querySelector('input[placeholder="ID"]').value=id;

}



//edit post
 student_update_form.onsubmit=(e)=>{
  e.preventDefault();

  const form_data=new FormData(e.target);
  const data=getDataLs("students");
  const {name,email,phone,location,photo,input_id }=Object.fromEntries(form_data);
console.log('form id'.input_id ); 
  


 const updateData=data.map((item) =>{
  console.log(item.id);
    if(item.id==input_id){
      return{
        ...item,
        name,
        email,
        phone,
        location,
        photo,
      }
    }else{
      return item;
    }
  });

 
  localStorage.setItem("students",JSON.stringify(updateData));


  getAllStudents();
  e.target.reset();
  student_update_btn.click();


} 



