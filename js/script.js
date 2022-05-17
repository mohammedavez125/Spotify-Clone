console.log("its working");
// inintialize the variables
let songIndex=0;
// let audioElement = new Audio('1.mp3');
let audioElement = document.getElementById('song1');
let masterPlay= document.getElementById('masterPlay');
let progressBar= document.getElementById('progressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    {songName:"Whistle Raja" , filePath: "./js/1.mp3" , coverPath:"../images/81w0BEZFRpL._SS500_.jpg" , duration:"3:13"},
    {songName:"Avicii - The Nights" , filePath: "./js/The Nights - Avicii- [MyMp3Bhojpuri.In].mp3" , coverPath:"../images/artworks-000120512683-tj0mts-t500x500.jpg" , duration:"2:55"},
    {songName:"Gutt Ch Paranda" , filePath: "./js/Gutt Ch Paranda Preet Sandhu 128 Kbps.mp3" , coverPath:"../images/Gutt-Ch-Paranda-Preet-Sandhu-500-500.jpg" , duration:"3:49"},
    {songName:"Somebody That I Used to Know" , filePath: "./js/Gotye_ft_Kimbra_-_Somebody_That_I_Used_To_Know.mp3" , coverPath:"../images/Making-Mirrors-2012-500x500.jpg" , duration:"4:04"},
    {songName:"Sia - Unstoppable" , filePath: "./js/Unstoppable(PaglaSongs).mp3" , coverPath:"../images/Unstoppable-English-2016-500x500.jpg" , duration:"4:06"}
]

songItem.forEach((element,i)=>{
    // element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("timeStamp")[0].innerText = songs[i].duration;
})

// handle pause play buttons
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        }else{
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity=0;

    }
})

// listen to events 
audioElement.addEventListener('timeupdate',()=>{
    // update seek bar 
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value = progress;
})
progressBar.addEventListener('change',()=>{
    audioElement.currentTime = progressBar.value * audioElement.duration/100 ; 
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
        audioElement.pause();
        audioElement.currentTime=0;
        
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement = document.getElementById(`song${songIndex+1}`);
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=4){
        songIndex=0;
        audioElement.pause();
        }else{
            songIndex+=1;
            audioElement.pause();
        }
    audioElement = document.getElementById(`song${songIndex+1}`);
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play(); 
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=4;
        audioElement.pause();
        }else{
            songIndex-=1;
            audioElement.pause();
        }
    audioElement = document.getElementById(`song${songIndex+1}`);
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
