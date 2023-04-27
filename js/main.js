let elStudentRow = document.getElementById('student-template').content;
let elTablebody =document.getElementById('students-table-body');
let elFilter =document.querySelector(".filter");
let elSearch = document.getElementById("search");
let elFrom = document.getElementById('from');
let elTo = document.getElementById('to');
let elSort = document.getElementById('sortby');


let sortfn = {
    az: (a,b) => {
     if (a.name > b.name) {
        return 1;
     }

     if (a.name < b.name) {
        return -1;
     }

     return 0;
    },

    za: (a,b) => {
        if (a.name > b.name) {
           return -1;
        }
   
        if (a.name < b.name) {
           return 1;
        }
   
        return 0;
       },
       tolowest: (a,b)  => b.mark - a.mark,
       tohighest: (a,b)  => a.mark - b.mark,
       date: (a,b) => {
        new Date (a.markedDate).getSeconds() - new Date(a.markedDate).getSeconds();

    } 

}

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
   


    let regex = new RegExp(searchvalue, 'gi')
    console.log(elFrom, elTo);

   let filtredstudents = []
   students.forEach((student) => {
    if (!searchvalue) {
        return filtredstudents.push(student)
        
    }
    if (`${student.name} ${student.Lastname}`.match(regex)) {
        let text = `${student.name} ${student.Lastname}`.match(regex) [0];

        console.log(text)
           filtredstudents.push({
               ...student, 
                   name: student.name .replace(text,  `<mark>${text}</mark>`),
           });
          

       }
   });

  if (elFrom.value && elTo.value ) {
 filtredstudents = filtredstudents.filter((student)=>student.mark >= elFrom.value -0 && student.mark <= elTo.value -0 )
}
if (elSort.value) {
    filtredstudents.sort(sortfn[elSort.value])
    
}

renderStudents(filtredstudents)
}

elFilter.addEventListener('submit',Onfilter )




