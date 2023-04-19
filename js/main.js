let elStudentRow = document.getElementById('student-template').content;
let elTablebody =document.getElementById('students-table-body');
let elFilter =document.querySelector(".filter");
let elSearch = document.getElementById("search")
function renderStudents(arr){
    elTablebody.innerHTML = null;
    arr.forEach(element => {
        let student = elStudentRow.cloneNode(true);

        let studentId = student.querySelector('.student-id');
        let studentName = student.querySelector('.student-name');
        let studentMark = student.querySelector('.student-mark');
        let studentMarkedDate = student.querySelector('.student-marked-date');
        let studentpassStatus = student.querySelector('.student-pass-status');
    

        studentId.textContent = element.id;
        studentName.innerHTML =element.name + ' ' + element.Lastname;
        studentMarkedDate.textContent = element.markedDate;
        studentMark.textContent = element.mark;
        
        if (element.mark >= 104) {
            studentpassStatus.textContent = `success`
            studentpassStatus.classList.add('bg-success')  

        }else{
            studentpassStatus.textContent = 'reject'
            studentpassStatus.classList.add('bg-danger')  

        }

       
        elTablebody.append(student);
  });

 
};

renderStudents(students)


function Onfilter(evt) {
    evt.preventDefault()
   
  
    let searchvalue =elSearch.value.trim();
    if (!searchvalue) {
        alert('input some value')
    }


    let regex = new RegExp(searchvalue, 'gi')
    console.log(regex);

   let filtredstudents = []
   students.forEach((student) => {
    if (student.name .match(regex)) {
       filtredstudents.push(  {... student,name: student.name.replace(searchvalue,`<mark>${searchvalue}</mark>`),
    });
   console.log(filtredstudents.name)
        
     }});
  
  
renderStudents(filtredstudents)

}


elFilter.addEventListener('submit',Onfilter )




