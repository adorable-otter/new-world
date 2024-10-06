const audio1=new Audio('Big_Sleep.mp3');
// const audio1=new Audio('no-copyright.mp3');
document.querySelector("#bgm").addEventListener("click",function(){
    
    
    audio1.loop=false;// 반복재생하지 않음
    audio1.volume=0.1;// 음량 설정
    audio1.play();// sound1.mp3 재생
    });
    
    document.querySelector("#stop").addEventListener("click",function(){
        
        audio1.loop=false;// 반복재생하지 않음
        audio1.pause();  
        
    });
    