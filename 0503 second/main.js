/*
 1. 유저가 값을 인풋에 저장한다
 2. 버튼 + 을 클릭하면 아이템이 더해진다. 할 일이 추가된다.
 3. 유저가 삭제 버튼을 누르면 할 일이 사라진다
 4. 체크 버튼을 누르면 할 일이 끝나면서 줄이 그어진다
 5. 진행중, 끝난 일을 누르면 언더바가 이동한다
 6. 끝난 탭에는 끝난 아이템만, 탭에 따라 할 일 보여주기
 */
 let taskList = []
 let mode ='all'
 let filterList = []


 let taskInput = document.getElementById('task_input')
 let addButton = document.getElementById('add_button')
 let taps = document.querySelectorAll('.task_taps div')
 console.log(taps)



 addButton.addEventListener('click', addTask)
 taskInput.addEventListener('focus', function(){
    taskInput.value=''
 })

  taskInput.addEventListener('keypress', function(enterEvent){
       if(enterEvent.key==="Enter"){
         addTask()

       }
  })

//  taskInput.addEventListener('keyup',function(event){
//     if(event.Keycode === 13)
//     addTask()
//  })


 for(let i = 1; i < taps.length; i++){
    taps[i].addEventListener('click', function(event){filter(event)})
 }




 function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskInput.value=''
    taskList.push(task)
    taskInput.value=''
    rander()
}

function rander(){
    let list = []
    if (mode == 'all'){
        list = taskList
    }else if (mode == 'ongoing' || mode == 'done'){
        list = filterList
    }

    let resultHTML = ''
    for(let i = 0; i < list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `
            <div class="task">
                    
            <div class="task_done">${list[i].taskContent}</div>
            <div class="button_wrap">
                <button onclick="toggleComplete('${list[i].id}')">✔</button>
                <button onclick="deleteTask('${list[i].id}')">❌</button>
            </div>

        </div>

            `
        } else {
            resultHTML += `
        <div class="task">
                    
                    <div>${list[i].taskContent}</div>
                    <div  class="button_wrap">
                        <button onclick="toggleComplete('${list[i].id}')">✔</button>
                        <button onclick="deleteTask('${list[i].id}')">❌</button>
                    </div>
    
                </div>
    
        `
        }
        
    }
    document.getElementById('task_board').innerHTML = resultHTML
}

function toggleComplete(id){
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = ! taskList[i].isComplete  //값 반전
            break
        }
    }
    rander()
    console.log(taskList)
}

function deleteTask(id){
 for(let i = 0; i < taskList.length; i++){
    if(taskList[i].id == id){
        taskList.splice(i , 1)
        break
    }
 }
 rander()
}



function filter(event){
    filterList = []
    mode= event.target.id
    document.getElementById('under_line').style.width = event.target.offsetWidth + 'px'
    document.getElementById('under_line').style.top ='83px'
    document.getElementById('under_line').style.left = event.target.offsetLeft + 'px'
    if(mode == 'all'){
        rander()
    } else if(mode == 'ongoing'){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        }
        rander()
    }else if(mode == 'done'){
        for(i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
        rander()
    }
    console.log(filterList)
}




function randomIDGenerate(){
    return Math.random().toString(36).substr(2, 16);
}
