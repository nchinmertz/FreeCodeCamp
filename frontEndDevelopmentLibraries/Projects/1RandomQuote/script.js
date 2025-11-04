const lyrics = [
    {lyric:"He said the way my blue eyes shined put those Georgia stars to shame that night.", song: "Tim McGraw", album:"debut"},
    {lyric: "My mistake, I didn't know to be in love you had to fight to have the upper hand.", song: "White Horse", album:"fearless"},
    {lyric:"Hold on to spinning around\nConfetti falls to the ground\nMay these memories break our fall", song: "Long Live", album:"speak-now"},
    {lyric:"And I guess we fell apart in the usual way\nAnd the story's got dust on every page", song: "Holy Ground", album:"red"},
    {lyric:"Ten months sober, I must admit\nJust because you're clean, don't mean you don't miss it", song: "Clean", album:"og-1989"},
    {lyric:"And if I get burned, at least we were electrified", song: "Dress", album:"rep"},
    {lyric:"Devils roll the dice, angels roll their eyes", song: "Cruel Summer", album:"lover"},
    {lyric:"I'm still on that tightrope I'm still trying everything to get you laughing at me", song: "mirrorball", album:"folklore"},
    {lyric:"Now you hang from my lips\nLike the Gardens of Babylon", song: "cowboy like me", album:"evermore"},
    {lyric:"I lived, and I learned, had you, got burned", song: "You All Over Me", album:"fealess-tv"},
    {lyric:"And did the twin flame bruise paint you  blue?\nJust between us, did the love affair maim you too?", song: "All Too Well (10 Minute Version)", album: "red-tv"},
    {lyric:"No one sees when you lose when you're playing solitaire", song: "Dear Reader", album:"midnights"},
    {lyric:"I've got my money on things goin' badly\nGot a history of stories ending sadly", song: "Electric Touch", album:"speak-now-tv"},
    {lyric:"Oh, Lord, I think about jumping off of very tall somethings\nJust to see you come running", song: "Is it Over Now?", album:"tv-1989"},
    {lyric:"Bygones will be bygone, eras fadin' into gray", song: "imgonnagetyouback", album:"ttpd"},
    {lyric:"Mistake my kindness for weakness and find your card cancelled", song: "Father Figure", album:"tloas"}
];

const box = document.getElementById("quote-box");
const text = document.getElementById("text");
const title = document.getElementById("author");
const btn = document.getElementById("new-quote");
//console.log(Math.floor(Math.random()*lyrics.length))
function getQuote(){
    const lyricObject = lyrics[Math.floor(Math.random()*lyrics.length)]
    text.textContent = lyricObject.lyric;
    title.textContent = lyricObject.song;
    box.classList.add(lyricObject.album);
}
document.addEventListener("DOMContentLoaded", getQuote());
btn.addEventListener("click", getQuote)
